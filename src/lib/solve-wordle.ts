import Axios from "axios";

interface WordleResponse {
  solution: string;
}

export async function getSolutionNetwork(inputDate: string, setSolutionFunc: React.Dispatch<React.SetStateAction<string>>): Promise<void> {
  const url = process.env.WORDLE_PROD ? 'https://todays-wordle-backend.onrender.com' : 'http://localhost/wordle';
  try {
    setSolutionFunc((await Axios.get<WordleResponse>(url, { params: { date: inputDate } })).data.solution);
  } catch (e) {
    console.error(e);

    setSolutionFunc('Error getting solution');
  }
}
