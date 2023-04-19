import express, { Request, Response } from "express";
import Axios from "axios";
import { DateTime } from "luxon";
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';

dotenv.config();

const port = process.env.WORDLE_PORT ? Number.parseInt(process.env.WORDLE_PORT) : 8080;
const hostname = process.env.WORDLE_HOSTNAME ?? '0.0.0.0';

const corsOptions: CorsOptions  = {
  origin: process.env.DEV_URL ?? 'https://todays-wordle-backend.onrender.com',
  optionsSuccessStatus: 200
}

const app = express();

interface WordleParams {
  date: string;
}

interface WordleBody {
  id: string;
}

type WordleResponse = WordleResponseSolution | WorldResponseError;

interface WordleResponseSolution {
  solution: string;
}

export interface WorldResponseError {
  err: string;
}

interface NYTResponse {
  id: number;
  solution: string;
  print_date: string;
  days_since_launch: number;
  editor: string;
}

app.use(express.json());

app.use((req: Request<{}, any, WordleBody, WordleParams>, res: Response, next: express.NextFunction) => {
  req.body.id = uuid();
  next();
})

app.get(
  "/wordle",
  cors(corsOptions),
  asyncHandler(
    async (
      req: Request<{}, any, any, WordleParams>,
      res: Response<WordleResponse>
    ) => {
      log(req);

      if (!DateTime.fromJSDate(new Date(req.query.date)).isValid) {
        res.status(400).json({ err: "Unable to get solution" });
        log(req, res);
        return
      }

      const inputDate = req.query.date;
      const url = `https://www.nytimes.com/svc/wordle/v2/${inputDate}.json`;

      console.log(url);

      try {
        const solution = (await Axios.get<NYTResponse>(url)).data.solution;
        res.json({ solution });
      } catch (e) {
        res.status(400).json({ err: "Unable to get solution" });
      }

      log(req, res);
    }
  )
);

app.use(function (req: Request<{}, any, any, any>, res: Response) {
  log(req);
  res.status(404).send("Not found");
  log(req, res);
});

app.listen(port, hostname, () =>
  console.log(`Running on port http://${hostname}:${port}`)
);

function asyncHandler(func: Function) {
  return (req: Request, res: Response, next: express.NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
}

function log(req: Request<{}, any, WordleBody, WordleParams>, res?: Response): void {
  const message: LogMessage = {
    dateTime: new Date().toISOString(),
    reqMethod: req.method,
    reqUrl: req.url,
    id: req.body.id,
    reqIp: req.ip,
    reqIps: req.ips.length > 0 ? req.ips : undefined,
    resStatusCode: res ? res.statusCode : undefined,
    resStatusMessage: res ? res.statusMessage : undefined,
  }

  let logMessage = '';

  Object.values(message).forEach((value) => {
    if (value != undefined)
      logMessage += `${value} `;
  })

  console.log(logMessage);
}

interface LogMessage {
  id: string,
  dateTime: string;
  reqMethod: string;
  reqUrl: string;
  reqIp: string;
  reqIps?: string[];
  resStatusCode?: number;
  resStatusMessage?: string;
}