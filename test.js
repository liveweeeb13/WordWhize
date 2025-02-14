const wordgenerator = require("./wordGenerator");

async function main() {
  const generator = new wordgenerator();
  try {
    const result = await generator.gen(3, "fr");
    console.log(result);
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}

main();
