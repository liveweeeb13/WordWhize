const wordGenerator = require("./index");

async function main() {
  let word = await wordGenerator(5, "no")
  console.log(word);
}
main()
