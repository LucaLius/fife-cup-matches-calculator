import { describe, expect, test } from '@jest/globals';
import * as fs from 'fs';
import { parseXlsx } from "../excel-utils/excel-parser";
import { RawFileInfoGetter } from './raw-file-info-getter';
import { INPUT_TEST_FILES_TEAMS_DIR_PATH } from '../config/variables.config';

/* eslint-env jest */

describe('RawFileInfoGetter', () => {

  test('Should load and find 4 matches from one real working directory file ', () => {
    // const given = undefined;
    const expected = 4;

    const fileNames = fs.readdirSync(INPUT_TEST_FILES_TEAMS_DIR_PATH);

    const fileName = fileNames[0]
    const fileContent: string[][] = parseXlsx(`${INPUT_TEST_FILES_TEAMS_DIR_PATH}/${fileName}`);

    const actual = RawFileInfoGetter.getMatchesStartingIndexes(fileContent);

    expect(actual.length).toEqual(expected);
  })

  test('Should load and find 23 players in one team from one real working directory file ', () => {

    const expected = 19;

    const fileNames = fs.readdirSync(INPUT_TEST_FILES_TEAMS_DIR_PATH);
    const fileName = fileNames[0];
    const fileContent: string[][] = parseXlsx(`${INPUT_TEST_FILES_TEAMS_DIR_PATH}/${fileName}`);

    const matchIndex = 0;
    const matchFileRows = RawFileInfoGetter.getMatchFileRows(fileContent, matchIndex);

    const actual = RawFileInfoGetter.getRawAllPlayers(matchFileRows);

    expect(actual.length).toEqual(expected);
  })
})