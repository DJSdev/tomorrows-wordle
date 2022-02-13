import { possibleWords } from './words';

let seedDate = new Date(2021, 5, 19, 0, 0, 0, 0);
let seedNum = 864e5;

function getSeed(todaysDate: string) {
  var dateDiff =
    new Date(todaysDate).setHours(0, 0, 0, 0) - seedDate.setHours(0, 0, 0, 0);
  return Math.round(dateDiff / seedNum);
}

export function getSolution(todaysDate: string): string {
  var seed = getSeed(todaysDate);
  return possibleWords[seed % possibleWords.length];
}
