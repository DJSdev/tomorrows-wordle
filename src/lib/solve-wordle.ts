import Axios from "axios";
import env from '../env/env.json';

interface WordleResponse {
  solution: string;
}

export async function getSolutionNetwork(inputDate: string, setSolutionFunc: React.Dispatch<React.SetStateAction<string>>): Promise<void> {
  const url = `${ env.API_URL }/wordle`
  try {
    setSolutionFunc((await Axios.get<WordleResponse>(url, { params: { date: inputDate } })).data.solution);
  } catch (e) {
    console.error(e);

    setSolutionFunc('Error getting solution');
  }
}
