import { TeamsInfoImporter } from './teams-info-importer';
import { describe, expect, test } from '@jest/globals';
import * as fs from 'fs';
import { parseXlsx } from "../excel-utils/excel-parser";
import { INPUT_FILES_TEAMS_DIR_PATH } from '../input-files/input-files.utils';

/* eslint-env jest */

describe('TeamsInfoImporter.getTeamsInfo()', () => {
  test('Should load and parse the target test files from real working directory ', () => {
    // const given = undefined;
    const expected: string[][] = [];

    const actual = new TeamsInfoImporter().getTeamsInfo();

    expect(actual).toEqual(expected);
  })

  test('Should load and find 4 matches from one real working directory file ', () => {
    // const given = undefined;
    const expected = 4;

    const fileNames = fs.readdirSync(INPUT_FILES_TEAMS_DIR_PATH);

    const fileName = fileNames[0]
    const fileContent: string[][] = parseXlsx(`${INPUT_FILES_TEAMS_DIR_PATH}/${fileName}`);

    const actual = new TeamsInfoImporter().getMatchesInfoIndexes(fileContent);

    expect(actual.length).toEqual(expected);
  })

  test('Should load and find 23 players in one team from one real working directory file ', () => {

    const expected = 19;

    const fileNames = fs.readdirSync(INPUT_FILES_TEAMS_DIR_PATH);
    const fileName = fileNames[0];
    const fileContent: string[][] = parseXlsx(`${INPUT_FILES_TEAMS_DIR_PATH}/${fileName}`);

    const matchesInfoIndexes = new TeamsInfoImporter().getMatchesInfoIndexes(fileContent);
    const matchIndex = 0;
    const startingRowIndex = matchesInfoIndexes[matchIndex];

    const actual = new TeamsInfoImporter().getAllPlayers(fileContent, startingRowIndex);

    expect(actual.length).toEqual(expected);
  })
})