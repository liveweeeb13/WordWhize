#!/usr/bin/env node

const wordGenerator = require('./wordGenerator.js');
const languages = require('./langs.json');

// args
const args = process.argv.slice(2);
const lengthArg = args[0];
const lang = args[1] || 'en';

// Support or Help commands
const helpArgs = ["?", "--?", "-?", "help", "--help", "-h"];
if (!lengthArg || helpArgs.includes(lengthArg)) {
  return sendHelp();
}

if (args.includes("--list")) {
  return listLanguages();
}

if (args.includes("--support") || args.includes("--s")) {
  return showSupportInfo();
}

// Generate Word
async function generateWord() {
  if (lengthArg === "--random") {
    const randomLength = Math.floor(Math.random() * 20) + 1;
    try {
      const word = await wordGenerator(randomLength, lang);
      console.log(word);
    } catch (error) {
      console.error("❌ Error generating word:", error);
    }
    return process.exit(0);
  }

  const length = parseInt(lengthArg, 10);

  if (length > 50) {
    console.error('⚠️ Maximum length allowed is 50 characters.');
    return process.exit(1);
  }

  if (isNaN(length)) {
    return sendHelp();  // No length provided, show help
  }

  try {
    const word = await wordGenerator(length, lang);
    console.log(word);
  } catch (error) {
    console.error(error);
  }
}

generateWord();

// List available Languages
function listLanguages() {
  console.log("🌍 Available languages:");
  Object.keys(languages).forEach(lang => console.log(`- ${lang}`));
  process.exit(0);
}

// Show Help and Support Information
function showSupportInfo() {
  console.log(`
  \x1b[34m📖 Need Help?\x1b[0m
  \x1b[90m──────────────────────────────────────────\x1b[0m
  
  \x1b[33m📜 Documentation:\x1b[0m \x1b[4;34mhttps://github.com/liveweeeb13/WordWhize/blob/main/README.md\x1b[0m
  \x1b[31m⚠️  Error List:\x1b[0m \x1b[4;34mhttps://github.com/liveweeeb13/WordWhize/blob/main/errors.md\x1b[0m
  \x1b[32m💬 Discord Support:\x1b[0m \x1b[4;34mhttps://discord.gg/rm7fqE9Taz\x1b[0m

  \x1b[90m──────────────────────────────────────────\x1b[0m
  `);
  process.exit(0);
}

// Send Help Information
function sendHelp() {
  console.log(`
  \x1b[34m📖 WordWhize - Command list\x1b[0m
  \x1b[90m──────────────────────────────────────────\x1b[0m
  
  \x1b[32m📜 Generate a word:\x1b[0m
    \x1b[36mnpx wordwhize <length> [language]\x1b[0m
    → Generates a word with the given length in the specified language 
  
  \x1b[33m🎲 Random length:\x1b[0m
    \x1b[36mnpx wordwhize --random [language]\x1b[0m
    → Generates a word with a random length between 1 and 20
  
  \x1b[31m⚠️ Help & Support:\x1b[0m
    \x1b[36mnpx wordwhize --help\x1b[0m → Displays this help message
    \x1b[36mnpx wordwhize --list\x1b[0m → List available languages
    \x1b[36mnpx wordwhize --support\x1b[0m → Shows the package's links
    \x1b[36m🔗 GitHub:\x1b[0m  \x1b[4;34mhttps://github.com/liveweeeb13/WordWhize\x1b[0m
    \x1b[36m💬 Discord:\x1b[0m \x1b[4;34mhttps://discord.gg/rm7fqE9Taz\x1b[0m

  \x1b[90m──────────────────────────────────────────\x1b[0m
  `);
  process.exit(0);
}
