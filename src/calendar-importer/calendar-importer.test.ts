import { describe, expect, test } from '@jest/globals';
import { CalendarImporter } from './calendar-importer';
import { CalendarMatch } from '../models/calendar-match.model';
import { MatchDayCombinationsGroupPhaseBuilder } from './builders/match-day-combination-group-phase.builder';

/* eslint-env jest */

describe('calendar.importer', () => {
  test('Should create all the match combinations for hard-coded matchday one', () => {
    const matchDay = 1;
    const matchDayCombinationsGroupPhaseBuilder = new MatchDayCombinationsGroupPhaseBuilder();
    const calendarImporter = new CalendarImporter(matchDayCombinationsGroupPhaseBuilder);

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

  test('Should create all the match combinations for hard-coded matchday two', () => {
    const matchDay = 2;
    const matchDayCombinationsGroupPhaseBuilder = new MatchDayCombinationsGroupPhaseBuilder();
    const calendarImporter = new CalendarImporter(matchDayCombinationsGroupPhaseBuilder);

    const match_number_2_matches: CalendarMatch[] = [
      {
        id: 1,
        idGroup: 1, // Girone A,
        matchNumber: 2,
        homeId: 'SMOKING BIANCO.',
        awayId: 'BORGO GRAZZANO'
      },
      {
        id: 2,
        idGroup: 1, // Girone A
        matchNumber: 2,
        homeId: 'REAL DUREZZA',
        awayId: 'ASTON BIRRA'
      },
      {
        id: 3,
        idGroup: 2, // Girone B
        matchNumber: 2,
        homeId: 'NEROAZZURRI',
        awayId: 'REDBLACK'
      },
      {
        id: 4,
        idGroup: 2, // Girone B
        matchNumber: 2,
        homeId: 'RIVER BOLUDOS',
        awayId: 'FC PUSSY MIX'
      },
      {
        id: 5,
        idGroup: 3, // Girone C
        matchNumber: 2,
        homeId: 'IRON GAS',
        awayId: 'STARK INDUSTRIES'
      },
      {
        id: 6,
        idGroup: 3, // Girone C
        matchNumber: 2,
        homeId: 'AHI 3 CROCIATI',
        awayId: 'NOT ATHLETIC CRODANZO'
      },
      {
        id: 7,
        idGroup: 4, // Girone D
        matchNumber: 2,
        homeId: 'MANCHESTER SINTY',
        awayId: 'TEAM DADA'
      },
      {
        id: 8,
        idGroup: 4, // Girone D
        matchNumber: 2,
        homeId: 'COCABRODA',
        awayId: 'REAL MAKADAM'
      },
      {
        id: 9,
        idGroup: 5, // Girone E
        matchNumber: 2,
        homeId: 'NAPOLETHANOS',
        awayId: 'LOS ANGELO - UN ESPERTO'
      },
      {
        id: 10,
        idGroup: 5, // Girone E
        matchNumber: 2,
        homeId: 'BEN FICA',
        awayId: 'KANTÉ CABRIOLET'
      },
      {
        id: 11,
        idGroup: 6, // Girone F
        matchNumber: 2,
        homeId: 'BAYERN LEVERDUREN.',
        awayId: 'FC DIREZIONE'
      },
      {
        id: 12,
        idGroup: 6, // Girone F
        matchNumber: 2,
        homeId: 'CHIAVOVERONICA',
        awayId: 'DALLAS'
      },
      {
        id: 13,
        idGroup: 7, // Girone G
        matchNumber: 2,
        homeId: 'REAL GRIFONE',
        awayId: 'MICCOLILLE'
      },
      {
        id: 14,
        idGroup: 7, // Girone G
        matchNumber: 2,
        homeId: 'DINAMO KEYV',
        awayId: 'CSKA PIAVON'
      },
      {
        id: 15,
        idGroup: 8, // Girone H
        matchNumber: 2,
        homeId: 'I RAGAZZI',
        awayId: 'VILLA FRIGNAVERA'
      },
      {
        id: 16,
        idGroup: 8, // Girone H
        matchNumber: 2,
        homeId: 'CCORYO JUNIORS',
        awayId: 'ACK BOMBA'
      },
    ];
    const expected = match_number_2_matches;

    const actual = calendarImporter.getMatchDayMatches(matchDay);

    expect(actual).toEqual(expected);
  });
})

