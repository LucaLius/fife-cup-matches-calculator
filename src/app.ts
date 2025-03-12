import express, { Request } from "express";
import { mainProcess } from ".";
import { Competition } from "./enums/competition.enum";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.get("/calculate/:competition/:round", (req: Request, res: any) => {
  const { competition, round } = req.params;

  if (!Object.values(Competition).includes(competition as Competition)) {
    return res.status(400).json({ error: "Invalid competition type" });
  }

  const mainProcessParams = {
    competition: competition as Competition,
    round: Number.parseInt(round)
  }
  const result = mainProcess(mainProcessParams);
  res.send({ message: `Esit ${result.esit.toLocaleUpperCase()} for competition: ${result.params.competition}, round: ${result.params.round}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});