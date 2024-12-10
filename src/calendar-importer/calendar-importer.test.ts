import { describe, expect, test } from '@jest/globals';
import { CalendarImporter } from './calendar-importer';

/* eslint-env jest */

describe('calendar.importer', () => {
  test('Should parse the given file', () => {
    const matchDay = 1;
    const calendarImporter = new CalendarImporter();

    const old = calendarImporter.getCalendarMatches(matchDay)
    const expected = [old[0], old[1]];

    const actual = calendarImporter.getMatchDayMatches(matchDay);

    expect(actual).toEqual(expected);
  });
})