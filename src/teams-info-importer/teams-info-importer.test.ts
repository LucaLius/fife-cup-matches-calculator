import { TeamsInfoImporter } from './teams-info-importer';
import { describe, expect, test } from '@jest/globals';
import { INPUT_TEST_FILES_TEAMS_DIR_PATH } from '../input-files/input-files.utils';

/* eslint-env jest */

describe('TeamsInfoImporter.getTeamsInfo()', () => {
  test('Should load and parse the target test files from real working directory (currently two files inside)', () => {
    // const given = undefined;
    const filesInDirectory = 2;
    const teamsForFile = 8;
    const expected = filesInDirectory * teamsForFile;

    const filesExtraction = new TeamsInfoImporter(INPUT_TEST_FILES_TEAMS_DIR_PATH).getTeamsInfo();

    expect(filesExtraction.teamsInfo.length).toEqual(expected);
  })
})