#!/usr/bin/env node

const wordGenerator = require('./wordgenerator');

const args = process.argv.slice(2); 
const length = parseInt(args[0], 10); 
const lang = args[1] || 'en';

if (isNaN(length)) {
  console.error('❌ Please provide a valid number for word length.');
  process.exit(1);
}

wordGenerator(length, lang).then(console.log).catch(console.error);
