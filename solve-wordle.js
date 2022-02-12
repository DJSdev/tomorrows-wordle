const words = require("./words");

var seedDate = new Date(2021, 5, 19, 0, 0, 0, 0);

function getSeed(todaysDate) {
  var dateDiff =
    new Date(todaysDate).setHours(0, 0, 0, 0) - seedDate.setHours(0, 0, 0, 0);
  return Math.round(dateDiff / 864e5);
}

function getSolution(todaysDate) {
  var seed = getSeed(todaysDate);
  return words.possibleWords[seed % words.possibleWords.length];
}

if (!module.parent){
  if (process.argv.length === 3) {
    const date = new Date(process.argv[2]);
    console.log(getSolution(date));
  } else {
    const today = new Date().toLocaleString().replace(",", "");
    console.log(getSolution(today));
  }
}

module.exports = { getSolution: getSolution };
