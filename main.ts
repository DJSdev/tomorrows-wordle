import { getSolution } from "./src/lib/solve-wordle";

if (process.argv.length === 3) {
  const date = new Date(process.argv[2]).toLocaleString().replace(",", "");
  console.log(getSolution(date));
} else {
  const today = new Date().toLocaleString().replace(",", "");
  console.log(getSolution(today));
}
