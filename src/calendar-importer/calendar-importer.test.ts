import { describe, expect, test } from '@jest/globals';
import { CalendarImporter } from './calendar-importer';
import { CalendarMatch } from '../models/calendar-match.model';

/* eslint-env jest */

describe('calendar.importer', () => {
  test('Should create all the match combinations for hard-coded matchday one', () => {
    const matchDay = 1;
    const calendarImporter = new CalendarImporter();

    const match_number_1_matches: CalendarMatch[] = [
      {
        id: 1,
        idGroup: 1, // Girone A,
        matchNumber: 1,
        homeId: 'SMOKING BIANCO.',
        awayId: 'REAL DUREZZA'
      },
      {
        id: 2,
        idGroup: 1, // Girone A
        matchNumber: 1,
        homeId: 'BORGO GRAZZANO',
        awayId: 'ASTON BIRRA'
      },
      {
        id: 3,
        idGroup: 2, // Girone B
        matchNumber: 1,
        homeId: 'NEROAZZURRI',
        awayId: 'RIVER BOLUDOS'
      },
      {
        id: 4,
        idGroup: 2, // Girone B
        matchNumber: 1,
        homeId: 'REDBLACK',
        awayId: 'FC PUSSY MIX'
      },
      {
        id: 5,
        idGroup: 3, // Girone C
        matchNumber: 1,
        homeId: 'IRON GAS',
        awayId: 'AHI 3 CROCIATI'
      },
      {
        id: 6,
        idGroup: 3, // Girone C
        matchNumber: 1,
        homeId: 'STARK INDUSTRIES',
        awayId: 'NOT ATHLETIC CRODANZO'
      },
      {
        id: 7,
        idGroup: 4, // Girone D
        matchNumber: 1,
        homeId: 'MANCHESTER SINTY',
        awayId: 'COCABRODA'
      },
      {
        id: 8,
        idGroup: 4, // Girone D
        matchNumber: 1,
        homeId: 'TEAM DADA',
        awayId: 'REAL MAKADAM'
      },
      {
        id: 9,
        idGroup: 5, // Girone E
        matchNumber: 1,
        homeId: 'NAPOLETHANOS',
        awayId: 'BEN FICA'
      },
      {
        id: 10,
        idGroup: 5, // Girone E
        matchNumber: 1,
        homeId: 'LOS ANGELO - UN ESPERTO',
        awayId: 'KANTÉ CABRIOLET'
      },
      {
        id: 11,
        idGroup: 6, // Girone F
        matchNumber: 1,
        homeId: 'BAYERN LEVERDUREN.',
        awayId: 'CHIAVOVERONICA'
      },
      {
        id: 12,
        idGroup: 6, // Girone F
        matchNumber: 1,
        homeId: 'FC DIREZIONE',
        awayId: 'DALLAS'
      },
      {
        id: 13,
        idGroup: 7, // Girone G
        matchNumber: 1,
        homeId: 'REAL GRIFONE',
        awayId: 'DINAMO KEYV'
      },
      {
        id: 14,
        idGroup: 7, // Girone G
        matchNumber: 1,
        homeId: 'MICCOLILLE',
        awayId: 'CSKA PIAVON'
      },
      {
        id: 15,
        idGroup: 8, // Girone H
        matchNumber: 1,
        homeId: 'I RAGAZZI',
        awayId: 'CCORYO JUNIORS'
      },
      {
        id: 16,
        idGroup: 8, // Girone H
        matchNumber: 1,
        homeId: 'VILLA FRIGNAVERA',
        awayId: 'ACK BOMBA'
      },
    ];
    const expected = match_number_1_matches;

    const actual = calendarImporter.getMatchDayMatches(matchDay);

    expect(actual).toEqual(expected);
  });
})

