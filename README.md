# WordWhize

WordWhize is a random word generator supporting multiple languages. It allows you to generate words of a specified length.

## Installation

To install the module, use npm:

```bash
npm install wordwhize
```

## Usage

Here’s how to use it in your JavaScript code:

```javascript
const wordgenerator = require("wordwhize");

async function main() {
  try {
    const word = await wordgenerator.gen(5, "fr"); // Generate a 5-letter word in French
    console.log(word);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
```

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


## License
This project is licensed under ISC.