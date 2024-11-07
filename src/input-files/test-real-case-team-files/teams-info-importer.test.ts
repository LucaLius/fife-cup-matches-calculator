import { describe, expect, test } from '@jest/globals';
import { CalendarImporter } from '../../calendar-importer/calendar-importer';
import { CalendarMatch } from '../../models/calendar-match.model';
import { TeamInfo } from '../../models/team-info.model';
import { INPUT_TEST_REAL_CASE_1_FILES_TEAMS_DIR_PATH } from '../input-files.utils';
import { processRound } from '../../process-round';
import { TeamsInfoImporter } from '../../teams-info-importer/teams-info-importer';

/* eslint-env jest */

describe('Giornata 1 safe-check', () => {
  test('Should load and process the target test files and match results again hand-calculated results', () => {
    const expected = [
      {
        id: 1,
        idGroup: 1,
        matchNumber: 1,
        esit: '2',
        homeId: 'SMOKING BIANCO.',
        awayId: 'REAL DUREZZA',
        score: '5 - 6',
        homeScore: 5,
        homePoints: 85.5,
        awayScore: 6,
        awayPoints: 92
      },
      {
        id: 2,
        idGroup: 1,
        matchNumber: 1,
        esit: '2',
        homeId: 'BORGO GRAZZANO',
        awayId: 'ASTON BIRRA',
        score: '0 - 2',
        homeScore: 0,
        homePoints: 65,
        awayScore: 2,
        awayPoints: 72.5
      },
      {
        id: 3,
        idGroup: 2,
        matchNumber: 1,
        esit: '2',
        homeId: 'NEROAZZURRI',
        awayId: 'RIVER BOLUDOS',
        score: '0 - 1',
        homeScore: 0,
        homePoints: 60,
        awayScore: 1,
        awayPoints: 69.5
      },
      {
        id: 4,
        idGroup: 2,
        matchNumber: 1,
        esit: '2',
        homeId: 'REDBLACK',
        awayId: 'FC PUSSY MIX',
        score: '0 - 1',
        homeScore: 0,
        homePoints: 60.5,
        awayScore: 1,
        awayPoints: 70.5
      },
      {
        id: 5,
        idGroup: 3,
        matchNumber: 1,
        esit: '2',
        homeId: 'IRON GAS',
        awayId: 'AHI 3 CROCIATI',
        score: '2 - 3',
        homeScore: 2,
        homePoints: 75.5,
        awayScore: 3,
        awayPoints: 77
      },
      {
        id: 6,
        idGroup: 3,
        matchNumber: 1,
        esit: '2',
        homeId: 'STARK INDUSTRIES',
        awayId: 'NOT ATHLETIC CRODANZO',
        score: '1 - 6',
        homeScore: 1,
        homePoints: 70.5,
        awayScore: 6,
        awayPoints: 89.5
      },
      {
        id: 7,
        idGroup: 4,
        matchNumber: 1,
        esit: '2',
        homeId: 'MANCHESTER SINTY',
        awayId: 'COCABRODA',
        score: '1 - 2',
        homeScore: 1,
        homePoints: 69,
        awayScore: 2,
        awayPoints: 72
      },
      {
        id: 8,
        idGroup: 4,
        matchNumber: 1,
        esit: '1',
        homeId: 'TEAM DADA',
        awayId: 'REAL MAKADAM',
        score: '5 - 0',
        homeScore: 5,
        homePoints: 85.5,
        awayScore: 0,
        awayPoints: 59.5
      },
      {
        id: 9,
        idGroup: 5,
        matchNumber: 1,
        esit: '2',
        homeId: 'NAPOLETHANOS',
        awayId: 'BEN FICA',
        score: '1 - 3',
        homeScore: 1,
        homePoints: 67,
        awayScore: 3,
        awayPoints: 79.5
      },
      {
        id: 10,
        idGroup: 5,
        matchNumber: 1,
        esit: '2',
        homeId: 'LOS ANGELO - UN ESPERTO',
        awayId: 'KANTÉ CABRIOLET',
        score: '6 - 8',
        homeScore: 6,
        homePoints: 89,
        awayScore: 8,
        awayPoints: 97
      },
      {
        id: 11,
        idGroup: 6,
        matchNumber: 1,
        esit: '1',
        homeId: 'BAYERN LEVERDUREN.',
        awayId: 'CHIAVOVERONICA',
        score: '2 - 1',
        homeScore: 2,
        homePoints: 75,
        awayScore: 1,
        awayPoints: 71.5
      },
      {
        id: 12,
        idGroup: 6,
        matchNumber: 1,
        esit: 'X',
        homeId: 'FC DIREZIONE',
        awayId: 'DALLAS',
        score: '1 - 1',
        homeScore: 1,
        homePoints: 67,
        awayScore: 1,
        awayPoints: 70.5
      },
      {
        id: 13,
        idGroup: 7,
        matchNumber: 1,
        esit: '1',
        homeId: 'REAL GRIFONE',
        awayId: 'DINAMO KEYV',
        score: '3 - 1',
        homeScore: 3,
        homePoints: 77.5,
        awayScore: 1,
        awayPoints: 66
      },
      {
        id: 14,
        idGroup: 7,
        matchNumber: 1,
        esit: '1',
        homeId: 'MICCOLILLE',
        awayId: 'CSKA PIAVON',
        score: '4 - 1',
        homeScore: 4,
        homePoints: 82,
        awayScore: 1,
        awayPoints: 70
      },
      {
        id: 15,
        idGroup: 8,
        matchNumber: 1,
        esit: '1',
        homeId: 'I RAGAZZI',
        awayId: 'CCORYO JUNIORS',
        score: '4 - 1',
        homeScore: 4,
        homePoints: 82,
        awayScore: 1,
        awayPoints: 69.5
      },
      {
        id: 16,
        idGroup: 8,
        matchNumber: 1,
        esit: '2',
        homeId: 'VILLA FRIGNAVERA',
        awayId: 'ACK BOMBA',
        score: '0 - 3',
        homeScore: 0,
        homePoints: 64.5,
        awayScore: 3,
        awayPoints: 77.5
      }
    ];

    const calendarMatches: CalendarMatch[] = new CalendarImporter().getCalendarMatches(1);
    const teamsInfo: TeamInfo[] = new TeamsInfoImporter(INPUT_TEST_REAL_CASE_1_FILES_TEAMS_DIR_PATH).getTeamsInfo();
    const actual = processRound(calendarMatches, teamsInfo);

    expect(actual).toEqual(expected);
  })

})