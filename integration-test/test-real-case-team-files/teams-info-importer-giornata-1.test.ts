import { GroupCompositionGroupStageBuilder } from './../../src/calendar-importer/builders/group-compositions-builder/group-composition-group-stage-builder';
import { MatchDayCombinationsGroupStageBuilder } from './../../src/calendar-importer/builders/match-day-combinations-builder/match-day-combination-group-stage.builder';
import { describe, expect, test } from '@jest/globals';
import { CalendarImporter } from '../../src/calendar-importer/calendar-importer';
import { processRound } from '../../src/index';
import { TeamsInfoImporter } from '../../src/teams-info-importer/teams-info-importer';
import fs from 'fs';
import path from 'path';

/* eslint-env jest */
const INPUT_FILE_DIR_PATH = `${__dirname}`;
const INPUT_TEST_REAL_CASE_1_FILES_TEAMS_DIR_PATH = `${INPUT_FILE_DIR_PATH}/in/1`;

describe('Giornata 1 safe-check', () => {
  const oldSeason = '24_25';

  test('Should load and process the target test files and match results again hand-calculated results', () => {
    const expected = [
      {
        id: 1,
        idGroup: 'A',
        matchNumber: 1,
        esit: '2',
        homeId: 'SMOKING BIANCO.',
        homeOriginalGroup: 'A',
        awayId: 'REAL DUREZZA',
        awayOriginalGroup: 'B',
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
        idGroup: 'A',
        matchNumber: 1,
        esit: '2',
        homeId: 'BORGO GRAZZANO',
        homeOriginalGroup: 'C',
        awayId: 'ASTON BIRRA',
        awayOriginalGroup: 'D',
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
        idGroup: 'B',
        matchNumber: 1,
        esit: '2',
        homeId: 'NEROAZZURRI',
        homeOriginalGroup: 'A',
        awayId: 'RIVER BOLUDOS',
        awayOriginalGroup: 'B',
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
        idGroup: 'B',
        matchNumber: 1,
        esit: '2',
        homeId: 'REDBLACK',
        homeOriginalGroup: 'C',
        awayId: 'FC PUSSY MIX',
        awayOriginalGroup: 'D',
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
        idGroup: 'C',
        matchNumber: 1,
        esit: '2',
        homeId: 'IRON GAS',
        homeOriginalGroup: 'A',
        awayId: 'AHI 3 CROCIATI',
        awayOriginalGroup: 'B',
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
        idGroup: 'C',
        matchNumber: 1,
        esit: '2',
        homeId: 'STARK INDUSTRIES',
        homeOriginalGroup: 'C',
        awayId: 'NOT ATHLETIC CRODANZO',
        awayOriginalGroup: 'D',
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
        idGroup: 'D',
        matchNumber: 1,
        esit: '2',
        homeId: 'MANCHESTER SINTY',
        homeOriginalGroup: 'A',
        awayId: 'COCABRODA',
        awayOriginalGroup: 'B',
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
        idGroup: 'D',
        matchNumber: 1,
        esit: '1',
        homeId: 'TEAM DADA',
        homeOriginalGroup: 'C',
        awayId: 'REAL MAKADAM',
        awayOriginalGroup: 'D',
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
        idGroup: 'E',
        matchNumber: 1,
        esit: '2',
        homeId: 'NAPOLETHANOS',
        homeOriginalGroup: 'A',
        awayId: 'BEN FICA',
        awayOriginalGroup: 'B',
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
        idGroup: 'E',
        matchNumber: 1,
        esit: '2',
        homeId: 'LOS ANGELO - UN ESPERTO',
        homeOriginalGroup: 'C',
        awayId: 'KANTÉ CABRIOLET',
        awayOriginalGroup: 'D',
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
        idGroup: 'F',
        matchNumber: 1,
        esit: '1',
        homeId: 'BAYERN LEVERDUREN.',
        homeOriginalGroup: 'A',
        awayId: 'CHIAVOVERONICA',
        awayOriginalGroup: 'B',
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
        idGroup: 'F',
        matchNumber: 1,
        esit: 'X',
        homeId: 'FC DIREZIONE',
        homeOriginalGroup: 'C',
        awayId: 'DALLAS',
        awayOriginalGroup: 'D',
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
        idGroup: 'G',
        matchNumber: 1,
        esit: '1',
        homeId: 'REAL GRIFONE',
        homeOriginalGroup: 'A',
        awayId: 'DINAMO KEYV',
        awayOriginalGroup: 'B',
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
        idGroup: 'G',
        matchNumber: 1,
        esit: '1',
        homeId: 'MICCOLILLE',
        homeOriginalGroup: 'C',
        awayId: 'CSKA PIAVON',
        awayOriginalGroup: 'D',
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
        idGroup: 'H',
        matchNumber: 1,
        esit: '1',
        homeId: 'I RAGAZZI',
        homeOriginalGroup: 'A',
        awayId: 'CCORYO JUNIORS',
        awayOriginalGroup: 'B',
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
        idGroup: 'H',
        matchNumber: 1,
        esit: '2',
        homeId: 'VILLA FRIGNAVERA',
        homeOriginalGroup: 'C',
        awayId: 'ACK BOMBA',
        awayOriginalGroup: 'D',
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

    const matchDay = 1;
    const matchDayCombinationsGroupStageBuilder = new MatchDayCombinationsGroupStageBuilder(oldSeason);
    const groupCompositionGroupStageBuilder = new GroupCompositionGroupStageBuilder(oldSeason);
    const calendarImporter = new CalendarImporter(matchDayCombinationsGroupStageBuilder, groupCompositionGroupStageBuilder);
    const matchDayMatches = calendarImporter.getMatchDayMatches(matchDay);
    const calendarMatches = matchDayMatches ?? [];

    const files: Express.Multer.File[] = [];

    const fileNames = fs.readdirSync(INPUT_TEST_REAL_CASE_1_FILES_TEAMS_DIR_PATH);

    fileNames.forEach((fileName) => {
      const filePath = path.join(INPUT_TEST_REAL_CASE_1_FILES_TEAMS_DIR_PATH, fileName);
      const buffer = fs.readFileSync(filePath);

      const file: Express.Multer.File = {
        fieldname: 'files',
        originalname: fileName,
        encoding: '7bit',
        mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: buffer.length,
        buffer,
        destination: INPUT_TEST_REAL_CASE_1_FILES_TEAMS_DIR_PATH,
        filename: fileName,
        path: filePath,
        stream: fs.createReadStream(filePath)
      } as unknown as Express.Multer.File;

      files.push(file);
    });



    const filesExtraction = new TeamsInfoImporter().getTeamsInfo(files);
    const actual = processRound(calendarMatches, filesExtraction.teamsInfo);

    expect(actual).toEqual(expected);

    // modifiers check
    actual.forEach((el, index) => {
      expect(el.homeDetails.crossTeamModifiers).toEqual(expected[index].homeDetails.crossTeamModifiers);
    })
  })

})