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
      en: "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt", // English
      fr: "https://raw.githubusercontent.com/words/an-array-of-french-words/master/index.json", // French
      es: "https://raw.githubusercontent.com/ManiacDC/TypingAid/master/Wordlists/Wordlist%20Spanish.txt", // Spanish
      it: "https://raw.githubusercontent.com/ManiacDC/TypingAid/master/Wordlists/WordList_ItalianAbc%20rommmcek.txt", // Italian
      ro: "https://raw.githubusercontent.com/ManiacDC/TypingAid/refs/heads/master/Wordlists/Wordlist%20Romanian.txt", // Romanian
      ar: "https://raw.githubusercontent.com/kkrypt0nn/wordlists/main/wordlists/languages/arabic.txt", // Arabic
      hr: "https://raw.githubusercontent.com/kkrypt0nn/wordlists/main/wordlists/languages/croatian.txt", // Croatian
      cs: "https://raw.githubusercontent.com/kkrypt0nn/wordlists/main/wordlists/languages/czech.txt", // Czech
      da: "https://raw.githubusercontent.com/kkrypt0nn/wordlists/main/wordlists/languages/danish.txt", // Danish
      nl: "https://raw.githubusercontent.com/kkrypt0nn/wordlists/main/wordlists/languages/dutch.txt", // Dutch
      ka: "https://raw.githubusercontent.com/kkrypt0nn/wordlists/main/wordlists/languages/georgian.txt", // Georgian
      no: "https://raw.githubusercontent.com/kkrypt0nn/wordlists/main/wordlists/languages/norwegian.txt" // Norwegian
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
