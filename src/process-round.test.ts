import { describe, expect, test } from '@jest/globals';
import { processRound } from './process-round';
import { CalendarMatch } from './models/calendar-match.model';
import { TeamInfo } from './models/team-info.model';
import { PlayerInfo } from './models/player-info.model';

/* eslint-env jest */

describe('processRound()', () => {
  test('Should say who won between home and visitors teams', () => {
    const given = {
      calendarMatches: [
        {
          id: 1,
          homeId: "team_A",
          awayId: "team_D",
        },
        {
          id: 2,
          homeId: "team_C",
          awayId: "team_D",
        },
        {
          id: 3,
          homeId: "team_E",
          awayId: "team_D",
        }
      ] as CalendarMatch[],
      teamsInfo: [
        {
          teamId: 'team_A',
          formation: '3-4-3',
          allPlayersByRole: {
            P: [{ fantasyVote: (66 - 30) }] as PlayerInfo[],
            D: [{ fantasyVote: undefined }] as PlayerInfo[],
            C: [{ fantasyVote: undefined }] as PlayerInfo[],
            A: [{ fantasyVote: undefined }] as PlayerInfo[],
          }
        },
        {
          teamId: 'team_C',
          formation: '3-4-3',
          allPlayersByRole: {
            P: [{ fantasyVote: (73 - 30) }] as PlayerInfo[],
            D: [{ fantasyVote: undefined }] as PlayerInfo[],
            C: [{ fantasyVote: undefined }] as PlayerInfo[],
            A: [{ fantasyVote: undefined }] as PlayerInfo[],
          }
        },
        {
          teamId: 'team_D',
          formation: '3-4-3',
          allPlayersByRole: {
            P: [{ fantasyVote: (68.5 - 30) }] as PlayerInfo[],
            D: [{ fantasyVote: undefined }] as PlayerInfo[],
            C: [{ fantasyVote: undefined }] as PlayerInfo[],
            A: [{ fantasyVote: undefined }] as PlayerInfo[],
          }
        },
        {
          teamId: 'team_E',
          formation: '3-4-3',
          allPlayersByRole: {
            P: [{ fantasyVote: (64.5 - 30) }] as PlayerInfo[],
            D: [{ fantasyVote: undefined }] as PlayerInfo[],
            C: [{ fantasyVote: undefined }] as PlayerInfo[],
            A: [{ fantasyVote: undefined }] as PlayerInfo[],
          }
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
      },
      {
        id: 3,
        esit: "2"
      }
    ]

    const actual = processRound(given.calendarMatches, given.teamsInfo);

    expect(actual[0].esit).toEqual(expected[0].esit);
    expect(actual[1].esit).toEqual(expected[1].esit);
    expect(actual[2].esit).toEqual(expected[2].esit);
  })
})