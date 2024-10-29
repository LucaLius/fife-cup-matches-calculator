import { TeamsInfoImporter } from './teams-info-importer';
import { describe, expect, test } from '@jest/globals';
import * as fs from 'fs';
import { parseXlsx } from "../excel-utils/excel-parser";
import { INPUT_TEST_FILES_TEAMS_DIR_PATH } from '../input-files/input-files.utils';

/* eslint-env jest */

describe('TeamsInfoImporter.getTeamsInfo()', () => {
  test('Should load and parse the target test files from real working directory (currently two files inside)', () => {
    // const given = undefined;
    const filesInDirectory = 2;
    const teamsForFile = 8;
    const expected = filesInDirectory * teamsForFile;

    const actual = new TeamsInfoImporter(INPUT_TEST_FILES_TEAMS_DIR_PATH).getTeamsInfo();

    expect(actual.length).toEqual(expected);
  })

  test('Should load and find 4 matches from one real working directory file ', () => {
    // const given = undefined;
    const expected = 4;

    const fileNames = fs.readdirSync(INPUT_TEST_FILES_TEAMS_DIR_PATH);

    const fileName = fileNames[0]
    const fileContent: string[][] = parseXlsx(`${INPUT_TEST_FILES_TEAMS_DIR_PATH}/${fileName}`);

    const actual = new TeamsInfoImporter(INPUT_TEST_FILES_TEAMS_DIR_PATH).getMatchesInfoIndexes(fileContent);

    expect(actual.length).toEqual(expected);
  })

  test('Should load and find 23 players in one team from one real working directory file ', () => {

    const expected = 19;

    const fileNames = fs.readdirSync(INPUT_TEST_FILES_TEAMS_DIR_PATH);
    const fileName = fileNames[0];
    const fileContent: string[][] = parseXlsx(`${INPUT_TEST_FILES_TEAMS_DIR_PATH}/${fileName}`);

    const matchesInfoIndexes = new TeamsInfoImporter(INPUT_TEST_FILES_TEAMS_DIR_PATH).getMatchesInfoIndexes(fileContent);
    const matchIndex = 0;
    const startingRowIndex = matchesInfoIndexes[matchIndex];

    const actual = new TeamsInfoImporter(INPUT_TEST_FILES_TEAMS_DIR_PATH).getAllPlayers(fileContent, startingRowIndex);

    expect(actual.length).toEqual(expected);
  })
})