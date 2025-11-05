import { INPUT_TEST_FILES_TEAMS_DIR_PATH } from '../config/variables.config';
import { describe, expect, test } from '@jest/globals';
import { TeamsInfoImporter } from './teams-info-importer';
import fs from 'fs';
import path from 'path';

/* eslint-env jest */

describe('TeamsInfoImporter.getTeamsInfo()', () => {
  test('Should load and parse the target test files from real working directory (currently two files inside)', () => {
    // const given = undefined;
    const filesInDirectory = 2;
    const teamsForFile = 8;
    const expected = filesInDirectory * teamsForFile;

    const files: Express.Multer.File[] = [];

    const fileNames = fs.readdirSync(INPUT_TEST_FILES_TEAMS_DIR_PATH);

    fileNames.forEach((fileName) => {
      const filePath = path.join(INPUT_TEST_FILES_TEAMS_DIR_PATH, fileName);
      const buffer = fs.readFileSync(filePath);

      const file: Express.Multer.File = {
        fieldname: 'files',
        originalname: fileName,
        encoding: '7bit',
        mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: buffer.length,
        buffer,
        destination: INPUT_TEST_FILES_TEAMS_DIR_PATH,
        filename: fileName,
        path: filePath,
        stream: fs.createReadStream(filePath)
      } as unknown as Express.Multer.File;

      files.push(file);
    });

    const filesExtraction = new TeamsInfoImporter().getTeamsInfo(files);

    expect(filesExtraction.teamsInfo.length).toEqual(expected);
  })
})