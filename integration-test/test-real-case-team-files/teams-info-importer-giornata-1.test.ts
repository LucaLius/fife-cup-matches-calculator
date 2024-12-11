import { describe, expect, test } from '@jest/globals';
import { CalendarImporter } from '../../src/calendar-importer/calendar-importer';
import { CalendarMatch } from '../../src/models/calendar-match.model';
import { TeamInfo } from '../../src/models/team-info.model';
import { processRound } from '../../src/process-round';
import { TeamsInfoImporter } from '../../src/teams-info-importer/teams-info-importer';

/* eslint-env jest */
const INPUT_FILE_DIR_PATH = `${__dirname}`;
const INPUT_TEST_REAL_CASE_1_FILES_TEAMS_DIR_PATH = `${INPUT_FILE_DIR_PATH}/in/1`;

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
        homeDetails: {
          matchScore: 5,
          fantasyPoints: 85.5,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 3, teamId: 'SMOKING BIANCO.' },
            { id: 'captain', points: 1, teamId: 'SMOKING BIANCO.' }
          ],
        },
        awayDetails: {
          fantasyPoints: 92,
          matchScore: 6,
          crossTeamModifiers: [{ id: 'midfield', teamId: 'REAL DUREZZA', points: 2 }],
          baseModifiers: [
            { id: 'defense', points: 4, teamId: 'REAL DUREZZA' },
            { id: 'captain', points: 3, teamId: 'REAL DUREZZA' }
          ],
        },
      },
      {
        id: 2,
        idGroup: 1,
        matchNumber: 1,
        esit: '2',
        homeId: 'BORGO GRAZZANO',
        awayId: 'ASTON BIRRA',
        score: '0 - 2',
        homeDetails: {
          matchScore: 0,
          fantasyPoints: 65,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 2, teamId: 'BORGO GRAZZANO' }
          ],
        },
        awayDetails: {
          fantasyPoints: 72.5,
          matchScore: 2,
          crossTeamModifiers: [{ id: 'midfield', teamId: 'ASTON BIRRA', points: 2 }],
          baseModifiers: [
            { id: 'defense', points: 2, teamId: 'ASTON BIRRA' }
          ],
        },
      },
      {
        id: 3,
        idGroup: 2,
        matchNumber: 1,
        esit: '2',
        homeId: 'NEROAZZURRI',
        awayId: 'RIVER BOLUDOS',
        score: '0 - 1',
        homeDetails: {
          matchScore: 0,
          fantasyPoints: 60,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 1, teamId: 'NEROAZZURRI' }
          ],
        },
        awayDetails: {
          fantasyPoints: 69.5,
          matchScore: 1,
          crossTeamModifiers: [{ id: 'midfield', teamId: 'RIVER BOLUDOS', points: 2 }],
          baseModifiers: [
            { id: 'defense', points: 2, teamId: 'RIVER BOLUDOS' }
          ],
        },
      },
      {
        id: 4,
        idGroup: 2,
        matchNumber: 1,
        esit: '2',
        homeId: 'REDBLACK',
        awayId: 'FC PUSSY MIX',
        score: '0 - 1',
        homeDetails: {
          matchScore: 0,
          fantasyPoints: 60.5,
          crossTeamModifiers: [],
          baseModifiers: [],
        },
        awayDetails: {
          fantasyPoints: 70.5,
          matchScore: 1,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 2, teamId: 'FC PUSSY MIX' },
            { id: 'captain', points: 1, teamId: 'FC PUSSY MIX' }
          ],
        },
      },
      {
        id: 5,
        idGroup: 3,
        matchNumber: 1,
        esit: '2',
        homeId: 'IRON GAS',
        awayId: 'AHI 3 CROCIATI',
        score: '2 - 3',
        homeDetails: {
          matchScore: 2,
          fantasyPoints: 75.5,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 3, teamId: 'IRON GAS' }
          ],
        },
        awayDetails: {
          fantasyPoints: 77,
          matchScore: 3,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 2, teamId: 'AHI 3 CROCIATI' },
          ],
        },
      },
      {
        id: 6,
        idGroup: 3,
        matchNumber: 1,
        esit: '2',
        homeId: 'STARK INDUSTRIES',
        awayId: 'NOT ATHLETIC CRODANZO',
        score: '1 - 6',
        homeDetails: {
          matchScore: 1,
          fantasyPoints: 70.5,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 3, teamId: 'STARK INDUSTRIES' },
          ],
        },
        awayDetails: {
          fantasyPoints: 89.5,
          matchScore: 6,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 3, teamId: 'NOT ATHLETIC CRODANZO' },
            { id: 'captain', points: 3, teamId: 'NOT ATHLETIC CRODANZO' }
          ],
        },
      },
      {
        id: 7,
        idGroup: 4,
        matchNumber: 1,
        esit: '2',
        homeId: 'MANCHESTER SINTY',
        awayId: 'COCABRODA',
        score: '1 - 2',
        homeDetails: {
          matchScore: 1,
          fantasyPoints: 69,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 2, teamId: 'MANCHESTER SINTY' },
          ],
        },
        awayDetails: {
          fantasyPoints: 72,
          matchScore: 2,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'captain', points: 1, teamId: 'COCABRODA' }
          ],
        },
      },
      {
        id: 8,
        idGroup: 4,
        matchNumber: 1,
        esit: '1',
        homeId: 'TEAM DADA',
        awayId: 'REAL MAKADAM',
        score: '5 - 0',
        homeDetails: {
          matchScore: 5,
          fantasyPoints: 85.5,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 1, teamId: 'TEAM DADA' },
            { id: 'captain', points: 3, teamId: 'TEAM DADA' }
          ],
        },
        awayDetails: {
          fantasyPoints: 59.5,
          matchScore: 0,
          crossTeamModifiers: [],
          baseModifiers: [],
        },
      },
      {
        id: 9,
        idGroup: 5,
        matchNumber: 1,
        esit: '2',
        homeId: 'NAPOLETHANOS',
        awayId: 'BEN FICA',
        score: '1 - 3',
        homeDetails: {
          matchScore: 1,
          fantasyPoints: 67,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 2, teamId: 'NAPOLETHANOS' }
          ],
        },
        awayDetails: {
          fantasyPoints: 79.5,
          matchScore: 3,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 3, teamId: 'BEN FICA' }
          ],
        },
      },
      {
        id: 10,
        idGroup: 5,
        matchNumber: 1,
        esit: '2',
        homeId: 'LOS ANGELO - UN ESPERTO',
        awayId: 'KANTÉ CABRIOLET',
        score: '6 - 8',
        homeDetails: {
          matchScore: 6,
          fantasyPoints: 89,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 3, teamId: 'LOS ANGELO - UN ESPERTO' },
            { id: 'captain', points: 1, teamId: 'LOS ANGELO - UN ESPERTO' }
          ],
        },
        awayDetails: {
          fantasyPoints: 97,
          matchScore: 8,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 3, teamId: 'KANTÉ CABRIOLET' },
            { id: 'captain', points: 3, teamId: 'KANTÉ CABRIOLET' }
          ],
        },
      },
      {
        id: 11,
        idGroup: 6,
        matchNumber: 1,
        esit: '1',
        homeId: 'BAYERN LEVERDUREN.',
        awayId: 'CHIAVOVERONICA',
        score: '2 - 1',
        homeDetails: {
          matchScore: 2,
          fantasyPoints: 75,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 2, teamId: 'BAYERN LEVERDUREN.' },
            { id: 'captain', points: 2, teamId: 'BAYERN LEVERDUREN.' }
          ],
        },
        awayDetails: {
          fantasyPoints: 71.5,
          matchScore: 1,
          crossTeamModifiers: [],
          baseModifiers: [],
        },
      },
      {
        id: 12,
        idGroup: 6,
        matchNumber: 1,
        esit: 'X',
        homeId: 'FC DIREZIONE',
        awayId: 'DALLAS',
        score: '1 - 1',
        homeDetails: {
          matchScore: 1,
          fantasyPoints: 67,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 1, teamId: 'FC DIREZIONE' },
            { id: 'captain', points: 1, teamId: 'FC DIREZIONE' }
          ],
        },
        awayDetails: {
          fantasyPoints: 70.5,
          matchScore: 1,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 2, teamId: 'DALLAS' },
          ],
        },
      },
      {
        id: 13,
        idGroup: 7,
        matchNumber: 1,
        esit: '1',
        homeId: 'REAL GRIFONE',
        awayId: 'DINAMO KEYV',
        score: '3 - 1',
        homeDetails: {
          matchScore: 3,
          fantasyPoints: 77.5,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 1, teamId: 'REAL GRIFONE' },
            { id: 'captain', points: 1, teamId: 'REAL GRIFONE' }
          ],
        },
        awayDetails: {
          fantasyPoints: 66,
          matchScore: 1,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 1, teamId: 'DINAMO KEYV' },
          ],
        },
      },
      {
        id: 14,
        idGroup: 7,
        matchNumber: 1,
        esit: '1',
        homeId: 'MICCOLILLE',
        awayId: 'CSKA PIAVON',
        score: '4 - 1',
        homeDetails: {
          matchScore: 4,
          fantasyPoints: 82,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 2, teamId: 'MICCOLILLE' },
          ],
        },
        awayDetails: {
          fantasyPoints: 70,
          matchScore: 1,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 2, teamId: 'CSKA PIAVON' },
          ],
        },
      },
      {
        id: 15,
        idGroup: 8,
        matchNumber: 1,
        esit: '1',
        homeId: 'I RAGAZZI',
        awayId: 'CCORYO JUNIORS',
        score: '4 - 1',
        homeDetails: {
          matchScore: 4,
          fantasyPoints: 82,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 1, teamId: 'I RAGAZZI' },
            { id: 'captain', points: 3, teamId: 'I RAGAZZI' }
          ],
        },
        awayDetails: {
          fantasyPoints: 69.5,
          matchScore: 1,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 1, teamId: 'CCORYO JUNIORS' },
          ],
        },
      },
      {
        id: 16,
        idGroup: 8,
        matchNumber: 1,
        esit: '2',
        homeId: 'VILLA FRIGNAVERA',
        awayId: 'ACK BOMBA',
        score: '0 - 3',
        homeDetails: {
          matchScore: 0,
          fantasyPoints: 64.5,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 2, teamId: 'VILLA FRIGNAVERA' },
          ],
        },
        awayDetails: {
          fantasyPoints: 77.5,
          matchScore: 3,
          crossTeamModifiers: [],
          baseModifiers: [
            { id: 'defense', points: 2, teamId: 'ACK BOMBA' },
          ],
        },
      }
    ];

    const calendarMatches: CalendarMatch[] = new CalendarImporter().getCalendarMatches(1);
    const teamsInfo: TeamInfo[] = new TeamsInfoImporter(INPUT_TEST_REAL_CASE_1_FILES_TEAMS_DIR_PATH).getTeamsInfo();
    const actual = processRound(calendarMatches, teamsInfo);

    expect(actual).toEqual(expected);

    // modifiers check
    actual.forEach((el, index) => {
      expect(el.homeDetails.crossTeamModifiers).toEqual(expected[index].homeDetails.crossTeamModifiers);
    })
  })

})