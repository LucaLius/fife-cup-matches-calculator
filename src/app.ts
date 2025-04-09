import express, { Request } from "express";
import { mainProcess } from ".";
import { Competition } from "./enums/competition.enum";
import cors from 'cors';
import archiver from 'archiver';
import fs from 'fs';
import { OUTPUT_FILES_TEAMS_DIR_PATH } from "./output-files/output-files.utils";
import { getTeamList } from "./config/team-list.config";
import { getGroupStageGroups } from "./config/group-stage-group-list.config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Enable CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.get("/config", (req: Request, res) => {

  const config = {
    teams: getTeamList(),
    groupStage: {
      groups: getGroupStageGroups(),
    }
  };
  res.send({ config });
});

app.get("/calculate/:competition/:round", (req: Request, res) => {
  const { competition, round } = req.params;

  if (!Object.values(Competition).includes(competition as Competition)) {
    res.status(400).json({ message: undefined, error: "Invalid competition type" });
    return;
  }

  const mainProcessParams = {
    competition: competition as Competition,
    round: Number.parseInt(round)
  }
  const result = mainProcess(mainProcessParams);
  const message = `Esit ${result.esit.toLocaleUpperCase()} for competition: ${result.params.competition}, round: ${result.params.round}`;
  res.status(200).json({ message, error: undefined });
});

// Endpoint to generate and download the excel files
app.get('/download-excel', (req, res) => {
  const zipFileName = 'output.zip';

  // Create a zip archive
  const archive = archiver('zip', { zlib: { level: 9 } });

  // Set headers for file download
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename=${zipFileName}`);

  // Pipe archive to response
  archive.pipe(res);

  // Get all the file names
  fs.readdir(OUTPUT_FILES_TEAMS_DIR_PATH, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    console.log('Files in directory:', files);

    // Append files to the zip archive
    files.forEach(fileName => {
      const filePath = `${OUTPUT_FILES_TEAMS_DIR_PATH}/${fileName}`;
      console.log('Adding file to archive:', filePath);
      archive.file(filePath, { name: fileName });
    })

    // Finalize the archive
    archive.finalize();

    // Clean up temporary files after zip is created
    archive.on('end', () => {
      files.forEach(fileName => {
        const filePath = `${OUTPUT_FILES_TEAMS_DIR_PATH}/${fileName}`;
        console.log('Removing file:', filePath);
        fs.unlinkSync(filePath);
      });
    });
  });

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});