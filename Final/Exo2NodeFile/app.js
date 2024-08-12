var fs = require("fs");
if (!fs) process.exit(1);
if (process.argv.length < 3) {
  console.log("Syntax: fileName");
  process.exit(2);
}
// Premier paramètre passé en ligne de commande
var fileName = process.argv[2];
// Complétez votre code ici - ouvrez le fichier fileName
console.log("try to open local file : " + fileName);
function countLetters(myString) {
  return myString
    .toLowerCase()
    .match(/(.)\1*/gs)
    .reduce((acc, s) => (s.length > acc.length ? s : acc), "");
}
try {
  const data = fs.readFileSync(fileName, "utf-8");
  console.log(data);
  console.log(countLetters(data));
} catch (err) {
  console.error(err);
}
