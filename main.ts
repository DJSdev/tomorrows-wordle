import { DateTime } from "luxon";
import { getSolutionNetwork } from "./src/lib/solve-wordle";

(async function () {
  let solution: string = 'init';
  if (process.argv.length === 3) {
    const date = DateTime.fromISO(process.argv[2]).toFormat('yyyy-MM-dd');
    //@ts-ignore
    await getSolutionNetwork(date, (value) => solution = value);

    console.log(solution);
  } else {
    const today = DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd');
    //@ts-ignore
    await getSolutionNetwork(today, (value) => solution = value);

    console.log(solution);
  }
})();
