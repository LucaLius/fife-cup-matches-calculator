import { describe, expect, test } from '@jest/globals';
import { parseXlsx } from './excel-parser';
import fs from 'fs';
import path from 'path';

/* eslint-env jest */

describe('excel-parser parseXlsx()', () => {
  test('Should parse the given file', () => {
    // const given = undefined;
    const expected = [["test row 1"], ["test  row 2"]];

    const dir = __dirname;
    const fileName = 'test.xlsx';

    const filePath = path.join(dir, fileName);
    const buffer = fs.readFileSync(filePath);

    const actual = parseXlsx(buffer);

    expect(actual).toEqual(expected);
  });
})