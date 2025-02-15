# WordWhize v1.0.6

WordWhize is a random word generator supporting multiple languages. It allows you to generate words of a specified length.

## Installation

To install the module, use npm:

```bash
npm install wordwhize
```

Here's a polished and well-formatted version in English:

## Usage

**In JavaScript:**
Here’s how to use it in your JavaScript code:

```javascript
const wordGenerator = require("wordwhize");

async function main() {
  let word = await wordGenerator(5, "fr"); // Generate a 5-letter word in French
  console.log(word);
}
main()
```

**Command-line usage:**
To use it from the terminal, provide the word length and language as arguments:

```bash
npx wordwhize 7 en
```
This will generate a 7-letter word in English.

You can also use the following options:

`--list` to display available languages.
`--support` or `--s` to show help with support links.
`--random` to generate a word of random length between 1 and 20 characters.
**For example:**

```bash
npx wordwhize --random en
```
This will generate a random-length word in English.

**Note:**

You can customize the language code (e.g., "en" for English, "fr" for French) as needed.

## Supported Languages
- French (fr)
- English (en)
- Spanish (es)
- Italian (it)
- Romanian (ro)
- Arabic (ar)
- Croatian (hr)
- Czech (cs)
- Danish (da)
- Dutch (nl)
- Georgian (ka)
- Norwegian (no)
- Polish (pl)
- Japanese (ja)
- Turkish (tr)
- Russian (ru)


## Links
[Try online](https://github.com/liveweeeb13/wordwhize-demo/settings/pages) | [Help for error](https://github.com/liveweeeb13/WordWhize/blob/main/README.md) | [Developer discord](https://discordlookup.com/user/790240841598763018)

## License
This project is licensed under ISC.


