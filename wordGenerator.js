const https = require("https");
const fs = require("fs");
const path = require("path");
const languages = require("./langs.json");

const cacheDir = path.join(__dirname, "cache");

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir);
}

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

  const cacheFile = path.join(cacheDir, `${lang}.${isJson ? "json" : "txt"}`);

  if (fs.existsSync(cacheFile)) {
    const data = fs.readFileSync(cacheFile, "utf-8");
    const words = isJson ? JSON.parse(data) : data.split("\n").map(w => w.trim()).filter(Boolean);
    wordLists[lang] = words; 
    return words;
  }

  // Download the word list from the URL
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Error ${res.statusCode} while downloading words (Code: 103)`));
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk)); // Collect data in chunks
      res.on("end", () => {
        try {
          let words;
          if (isJson) {
            words = JSON.parse(data); // Convert JSON to an array
            if (!Array.isArray(words)) throw new Error("Invalid JSON format");
          } else {
            words = data.split("\n").map(w => w.trim()).filter(Boolean);
          }

          // Save the words to cache
          fs.writeFileSync(cacheFile, isJson ? JSON.stringify(words) : words.join("\n"));
          wordLists[lang] = words; // Store in memory
          resolve(words);
        } catch (err) {
          reject(new Error(`Error parsing data for ${lang}: ${err.message} (Code: 106)`));
        }
      });
    }).on("error", (err) => reject(err));
  });
}

async function wordGenerator(length, lang = "en") {
  try {
    const words = await fetchWordList(lang);

    // Filter the words to keep only those with the specified length
    const filteredWords = words.filter((word) => word.length === length);

    if (filteredWords.length === 0) {
      return `❌ No word found with ${length} letters in ${lang} (Code: 104)`;
    }

    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
  } catch (err) {
    return `❌ Error: ${err.message}`;
  }
}

module.exports = wordGenerator;
