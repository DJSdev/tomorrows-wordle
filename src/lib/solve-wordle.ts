import { possibleWords } from "./words";
import Axios from "axios";

let seedDate = new Date(2021, 5, 19, 0, 0, 0, 0);
let seedNum = 864e5;

function getSeed(todaysDate: string) {
  var dateDiff =
    new Date(todaysDate).setHours(0, 0, 0, 0) - seedDate.setHours(0, 0, 0, 0);
  console.log(Math.round(dateDiff / seedNum));
  return Math.round(dateDiff / seedNum);
}

export function getSolution(todaysDate: string): string {
  var seed = getSeed(todaysDate);
  return possibleWords[seed % possibleWords.length];
}

export async function getSolutionNetwork(inputDate: string, setSolutionFunc: React.Dispatch<React.SetStateAction<string>>): Promise<void> {
  const url = `https://www.nytimes.com/svc/wordle/v2/${inputDate}.json`;
  try {
    setSolutionFunc((await Axios.get<WordleResponse>(url)).data.solution);
  } catch (e) {
    console.error(e);

    setSolutionFunc('Error getting solution');
  }
}

interface WordleResponse {
  id: number;
  solution: string;
  print_date: string;
  days_since_launch: number;
  editor: string;
}