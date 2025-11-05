import { describe, expect, test } from '@jest/globals';
import { CalendarImporter } from './calendar-importer';
import { CalendarMatch } from '../models/calendar-match.model';
import { MatchDayCombinationsGroupStageBuilder } from './builders/match-day-combinations-builder/match-day-combination-group-stage.builder';
import { GroupCompositionGroupStageBuilder } from './builders/group-compositions-builder/group-composition-group-stage-builder';

/* eslint-env jest */

describe('calendar.importer', () => {
  const oldSeason = '24_25';

  test('Should create all the match combinations for hard-coded matchday one', () => {
    const matchDay = 1;
    const matchDayCombinationsGroupStageBuilder = new MatchDayCombinationsGroupStageBuilder(oldSeason);
    const groupCompositionGroupStageBuilder = new GroupCompositionGroupStageBuilder(oldSeason);
    const calendarImporter = new CalendarImporter(matchDayCombinationsGroupStageBuilder, groupCompositionGroupStageBuilder);

    const match_number_1_matches: CalendarMatch[] = [
      {
        id: 1,
        idGroup: 'A', // Girone A,
        matchNumber: 1,
        homeId: 'SMOKING BIANCO.',
        homeOriginalGroup: 'A',
        awayId: 'REAL DUREZZA',
        awayOriginalGroup: 'B',
      },
      {
        id: 2,
        idGroup: 'A', // Girone A
        matchNumber: 1,
        homeId: 'BORGO GRAZZANO',
        homeOriginalGroup: 'C',
        awayId: 'ASTON BIRRA',
        awayOriginalGroup: 'D',
      },
      {
        id: 3,
        idGroup: 'B', // Girone B
        matchNumber: 1,
        homeId: 'NEROAZZURRI',
        homeOriginalGroup: 'A',
        awayId: 'RIVER BOLUDOS',
        awayOriginalGroup: 'B',
      },
      {
        id: 4,
        idGroup: 'B', // Girone B
        matchNumber: 1,
        homeId: 'REDBLACK',
        homeOriginalGroup: 'C',
        awayId: 'FC PUSSY MIX',
        awayOriginalGroup: 'D',
      },
      {
        id: 5,
        idGroup: 'C', // Girone C
        matchNumber: 1,
        homeId: 'IRON GAS',
        homeOriginalGroup: 'A',
        awayId: 'AHI 3 CROCIATI',
        awayOriginalGroup: 'B'
      },
      {
        id: 6,
        idGroup: 'C', // Girone C
        matchNumber: 1,
        homeId: 'STARK INDUSTRIES',
        homeOriginalGroup: 'C',
        awayId: 'NOT ATHLETIC CRODANZO',
        awayOriginalGroup: 'D'
      },
      {
        id: 7,
        idGroup: 'D', // Girone D
        matchNumber: 1,
        homeId: 'MANCHESTER SINTY',
        homeOriginalGroup: 'A',
        awayId: 'COCABRODA',
        awayOriginalGroup: 'B'
      },
      {
        id: 8,
        idGroup: 'D', // Girone D
        matchNumber: 1,
        homeId: 'TEAM DADA',
        homeOriginalGroup: 'C',
        awayId: 'REAL MAKADAM',
        awayOriginalGroup: 'D'
      },
      {
        id: 9,
        idGroup: 'E', // Girone E
        matchNumber: 1,
        homeId: 'NAPOLETHANOS',
        homeOriginalGroup: 'A',
        awayId: 'BEN FICA',
        awayOriginalGroup: 'B'
      },
      {
        id: 10,
        idGroup: 'E', // Girone E
        matchNumber: 1,
        homeId: 'LOS ANGELO - UN ESPERTO',
        homeOriginalGroup: 'C',
        awayId: 'KANTÉ CABRIOLET',
        awayOriginalGroup: 'D'
      },
      {
        id: 11,
        idGroup: 'F', // Girone F
        matchNumber: 1,
        homeId: 'BAYERN LEVERDUREN.',
        homeOriginalGroup: 'A',
        awayId: 'CHIAVOVERONICA',
        awayOriginalGroup: 'B'
      },
      {
        id: 12,
        idGroup: 'F', // Girone F
        matchNumber: 1,
        homeId: 'FC DIREZIONE',
        homeOriginalGroup: 'C',
        awayId: 'DALLAS',
        awayOriginalGroup: 'D'
      },
      {
        id: 13,
        idGroup: 'G', // Girone G
        matchNumber: 1,
        homeId: 'REAL GRIFONE',
        homeOriginalGroup: 'A',
        awayId: 'DINAMO KEYV',
        awayOriginalGroup: 'B'
      },
      {
        id: 14,
        idGroup: 'G', // Girone G
        matchNumber: 1,
        homeId: 'MICCOLILLE',
        homeOriginalGroup: 'C',
        awayId: 'CSKA PIAVON',
        awayOriginalGroup: 'D'
      },
      {
        id: 15,
        idGroup: 'H', // Girone H
        matchNumber: 1,
        homeId: 'I RAGAZZI',
        homeOriginalGroup: 'A',
        awayId: 'CCORYO JUNIORS',
        awayOriginalGroup: 'B'
      },
      {
        id: 16,
        idGroup: 'H', // Girone H
        matchNumber: 1,
        homeId: 'VILLA FRIGNAVERA',
        homeOriginalGroup: 'C',
        awayId: 'ACK BOMBA',
        awayOriginalGroup: 'D'
      },
    ];
    const expected = match_number_1_matches;

    const actual = calendarImporter.getMatchDayMatches(matchDay);

    expect(actual).toEqual(expected);
  });

  test('Should create all the match combinations for hard-coded matchday two', () => {
    const matchDay = 2;
    const matchDayCombinationsGroupStageBuilder = new MatchDayCombinationsGroupStageBuilder(oldSeason);
    const groupCompositionGroupStageBuilder = new GroupCompositionGroupStageBuilder(oldSeason);
    const calendarImporter = new CalendarImporter(matchDayCombinationsGroupStageBuilder, groupCompositionGroupStageBuilder);

    const match_number_2_matches: CalendarMatch[] = [
      {
        id: 1,
        idGroup: 'A', // Girone A,
        matchNumber: 2,
        homeId: 'SMOKING BIANCO.',
        homeOriginalGroup: 'A',
        awayId: 'BORGO GRAZZANO',
        awayOriginalGroup: 'C',
      },
      {
        id: 2,
        idGroup: 'A', // Girone A
        matchNumber: 2,
        homeId: 'REAL DUREZZA',
        homeOriginalGroup: 'B',
        awayId: 'ASTON BIRRA',
        awayOriginalGroup: 'D'
      },
      {
        id: 3,
        idGroup: 'B', // Girone B
        matchNumber: 2,
        homeId: 'NEROAZZURRI',
        homeOriginalGroup: 'A',
        awayId: 'REDBLACK',
        awayOriginalGroup: 'C',
      },
      {
        id: 4,
        idGroup: 'B', // Girone B
        matchNumber: 2,
        homeId: 'RIVER BOLUDOS',
        homeOriginalGroup: 'B',
        awayId: 'FC PUSSY MIX',
        awayOriginalGroup: 'D'
      },
      {
        id: 5,
        idGroup: 'C', // Girone C
        matchNumber: 2,
        homeId: 'IRON GAS',
        homeOriginalGroup: 'A',
        awayId: 'STARK INDUSTRIES',
        awayOriginalGroup: 'C',
      },
      {
        id: 6,
        idGroup: 'C', // Girone C
        matchNumber: 2,
        homeId: 'AHI 3 CROCIATI',
        homeOriginalGroup: 'B',
        awayId: 'NOT ATHLETIC CRODANZO',
        awayOriginalGroup: 'D'
      },
      {
        id: 7,
        idGroup: 'D', // Girone D
        matchNumber: 2,
        homeId: 'MANCHESTER SINTY',
        homeOriginalGroup: 'A',
        awayId: 'TEAM DADA',
        awayOriginalGroup: 'C',
      },
      {
        id: 8,
        idGroup: 'D', // Girone D
        matchNumber: 2,
        homeId: 'COCABRODA',
        homeOriginalGroup: 'B',
        awayId: 'REAL MAKADAM',
        awayOriginalGroup: 'D'
      },
      {
        id: 9,
        idGroup: 'E', // Girone E
        matchNumber: 2,
        homeId: 'NAPOLETHANOS',
        homeOriginalGroup: 'A',
        awayId: 'LOS ANGELO - UN ESPERTO',
        awayOriginalGroup: 'C',
      },
      {
        id: 10,
        idGroup: 'E', // Girone E
        matchNumber: 2,
        homeId: 'BEN FICA',
        homeOriginalGroup: 'B',
        awayId: 'KANTÉ CABRIOLET',
        awayOriginalGroup: 'D'
      },
      {
        id: 11,
        idGroup: 'F', // Girone F
        matchNumber: 2,
        homeId: 'BAYERN LEVERDUREN.',
        homeOriginalGroup: 'A',
        awayId: 'FC DIREZIONE',
        awayOriginalGroup: 'C',
      },
      {
        id: 12,
        idGroup: 'F', // Girone F
        matchNumber: 2,
        homeId: 'CHIAVOVERONICA',
        homeOriginalGroup: 'B',
        awayId: 'DALLAS',
        awayOriginalGroup: 'D'
      },
      {
        id: 13,
        idGroup: 'G', // Girone G
        matchNumber: 2,
        homeId: 'REAL GRIFONE',
        homeOriginalGroup: 'A',
        awayId: 'MICCOLILLE',
        awayOriginalGroup: 'C',
      },
      {
        id: 14,
        idGroup: 'G', // Girone G
        matchNumber: 2,
        homeId: 'DINAMO KEYV',
        homeOriginalGroup: 'B',
        awayId: 'CSKA PIAVON',
        awayOriginalGroup: 'D'
      },
      {
        id: 15,
        idGroup: 'H', // Girone H
        matchNumber: 2,
        homeId: 'I RAGAZZI',
        homeOriginalGroup: 'A',
        awayId: 'VILLA FRIGNAVERA',
        awayOriginalGroup: 'C',
      },
      {
        id: 16,
        idGroup: 'H', // Girone H
        matchNumber: 2,
        homeId: 'CCORYO JUNIORS',
        homeOriginalGroup: 'B',
        awayId: 'ACK BOMBA',
        awayOriginalGroup: 'D'
      },
    ];
    const expected = match_number_2_matches;

    const actual = calendarImporter.getMatchDayMatches(matchDay);

    expect(actual).toEqual(expected);
  });
})

