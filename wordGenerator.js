const https = require("https");
const fs = require("fs");
const path = require("path");

const cacheDir = path.join(__dirname, "cache");

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir);
}

const languages = {
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
  no: "https://raw.githubusercontent.com/kkrypt0nn/wordlists/main/wordlists/languages/norwegian.txt", // Norwegian
  pl: "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/languages/polish.txt", // Polish
  de: "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/languages/german.txt", // German
  ja: "https://raw.githubusercontent.com/hingston/japanese/refs/heads/master/44998-japanese-words.txt", // Japanese
  tr: "https://raw.githubusercontent.com/mertemin/turkish-word-list/refs/heads/master/words.txt", // Turkish
  ru: "https://raw.githubusercontent.com/hingston/russian/refs/heads/master/100000-russian-words.txt" // Russian
};


// Object to store loaded word lists to avoid repeated downloads
const wordLists = {};

async function fetchWordList(lang) {
  // If the word list is already loaded in memory, return it
  if (wordLists[lang]) {
    return wordLists[lang];
  }

  const url = languages[lang];
  if (!url) {
    throw new Error(`Unsupported language: ${lang} (Code: 102)`);
  }

  const isJson = url.endsWith(".json");

  // Define the cache file path to avoid multiple downloads
  const cacheFile = path.join(cacheDir, `${lang}.${isJson ? "json" : "txt"}`);

  // If the file already exists in the cache, load it from disk
  if (fs.existsSync(cacheFile)) {
    const data = fs.readFileSync(cacheFile, "utf-8");
    const words = isJson ? JSON.parse(data) : data.split("\n").map(w => w.trim()).filter(Boolean);
    wordLists[lang] = words; // Store the list in memory
    return words;
  }

  // Download the word list from the URL
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Error ${res.statusCode} while downloading words (Code: 103)`));
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk)); // Retrieve data in chunks
      res.on("end", () => {
        try {
          let words;
          if (isJson) {
            words = JSON.parse(data); // Convert JSON into an array
            if (!Array.isArray(words)) throw new Error("Invalid JSON format");
          } else {
            words = data.split("\n").map(w => w.trim()).filter(Boolean);
          }

          // Save the words in the cache
          fs.writeFileSync(cacheFile, isJson ? JSON.stringify(words) : words.join("\n"));
          wordLists[lang] = words; // Store in memory
          resolve(words);
        } catch (err) {
          reject(new Error(`Error parsing data for ${lang}: ${err.message} (Code: 104)`));
        }
      });
    }).on("error", (err) => reject(err));
  });
}

async function wordGenerator(length, lang = "en") {
  try {
    const words = await fetchWordList(lang);

    // Filter words to keep only those with the specified length
    const filteredWords = words.filter((word) => word.length === length);

    if (filteredWords.length === 0) {
      return `❌ No words found with ${length} letters in ${lang} (Code: 104)`;
    }

    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
  } catch (err) {
    return `❌ Error: ${err.message}`;
  }
}

module.exports = { wordGenerator, languages };

