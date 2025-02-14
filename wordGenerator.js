const https = require("https");
const fs = require("fs");
const path = require("path");

class WordGenerator {
  constructor() {
    this.cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir);
    }

    this.languages = {
      en: "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt",
      fr: "https://raw.githubusercontent.com/words/an-array-of-french-words/master/index.json",
    };

    this.wordLists = {};
  }


  async fetchWordList(lang) {
    if (this.wordLists[lang]) {
      return this.wordLists[lang];
    }

    const url = this.languages[lang];
    if (!url) {
      throw new Error(`Unsupported language: ${lang} (Code: 102)`);
    }

    const cacheFile = path.join(this.cacheDir, `${lang}.txt`);

    if (fs.existsSync(cacheFile)) {
      const words = fs.readFileSync(cacheFile, "utf-8").split("\n");
      this.wordLists[lang] = words;
      return words;
    }

    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode !== 200) {
          return reject(new Error(`Error ${res.statusCode} while downloading words (Code: 103)`));
        }

        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            if (lang === "fr") {
              const frenchWords = JSON.parse(data); 
              const words = Array.isArray(frenchWords) ? frenchWords : [];
              fs.writeFileSync(cacheFile, words.join("\n"));
              this.wordLists[lang] = words;
              resolve(words);
            } else {
              fs.writeFileSync(cacheFile, data);
              const words = data.split("\n");
              this.wordLists[lang] = words;
              resolve(words);
            }
          } catch (err) {
            reject(new Error(`Error parsing JSON data for ${lang}: ${err.message} (Code: 104)`));
          }
        });
      }).on("error", (err) => reject(err));
    });
  }

  async gen(length, lang = "en") {
    try {
      const words = await this.fetchWordList(lang);
      const filteredWords = words.filter((word) => word.length === length);

      if (filteredWords.length === 0) {
        return `❌ No words found with ${length} letters in ${lang} (Code: 104)`;
      }

      return filteredWords[Math.floor(Math.random() * filteredWords.length)];
    } catch (err) {
      return `❌ Error: ${err.message}`;
    }
  }
}

module.exports = WordGenerator;
