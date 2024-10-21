import { describe, expect, test } from '@jest/globals';
import { processRound } from './process-round';
import { CalendarMatch } from './models/calendar-match.model';
import { TeamInfo } from './models/team-info.model';

/* eslint-env jest */

describe('processRound()', () => {
  test('Should say who won between home and visitors teams', () => {
    const given = {
      calendarMatches: [
        {
          id: 1,
          homeId: "team_A",
          awayId: "team_B",
        },
        {
          id: 2,
          homeId: "team_C",
          awayId: "team_D",
        }
      ] as CalendarMatch[],
      teamsInfo: [
        {
          teamId: 'team_A',
          pointsScored: 66
        },
        {
          teamId: 'team_B',
          pointsScored: 66
        },
        {
          teamId: 'team_C',
          pointsScored: 73
        },
        {
          teamId: 'team_D',
          pointsScored: 68.5
        },

      ] as TeamInfo[],
    };

    const expected = [
      {
        id: 1,
        esit: "X"
      },
      {
        id: 2,
        esit: "1"
      }
    ]

    const actual = processRound(given.calendarMatches, given.teamsInfo);

    expect(actual[0].esit).toEqual(expected[0].esit);
    expect(actual[1].esit).toEqual(expected[1].esit);
  })
})