import { describe, expect, test } from '@jest/globals';
import { parseXlsx } from './excel-parser';

/* eslint-env jest */

describe('excel-parser parseXlsx()', () => {
  test('Should parse the given file', () => {
    // const given = undefined;
    const expected = [["test row 1"], ["test  row 2"]];

    const url = `${__dirname}/test.xlsx`;
    const actual = parseXlsx(url);

    expect(actual).toEqual(expected);
  });
})