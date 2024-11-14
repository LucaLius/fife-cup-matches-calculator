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
            P: [{ role: 'P', vote: 6, fantasyVote: 7 }] as PlayerInfo[],
            D: [
              { role: 'D', vote: 6, fantasyVote: 7 },
              { role: 'D', vote: 6, fantasyVote: 6 },
              { role: 'D', vote: 6, fantasyVote: 6 },
            ] as PlayerInfo[],
            C: [
              { role: 'C', vote: 6, fantasyVote: 6 },
              { role: 'C', vote: 6, fantasyVote: 6 },
              { role: 'C', vote: 6, fantasyVote: 6 },
              { role: 'C', vote: 6, fantasyVote: 6 },
            ] as PlayerInfo[],
            A: [
              { role: 'A', vote: 6, fantasyVote: 6 },
              { role: 'A', vote: 6, fantasyVote: 6 },
              { role: 'A', vote: 6, fantasyVote: 6 },
            ] as PlayerInfo[],
          }
        },
        {
          teamId: 'team_C',
          formation: '3-4-3',
          allPlayersByRole: {
            P: [{ role: 'P', vote: 6, fantasyVote: 9 }] as PlayerInfo[],
            D: [
              { role: 'D', vote: 6, fantasyVote: 6 },
              { role: 'D', vote: 6, fantasyVote: 6 },
              { role: 'D', vote: 6, fantasyVote: 6 },
            ] as PlayerInfo[],
            C: [
              { role: 'C', vote: 6, fantasyVote: 8 },
              { role: 'C', vote: 6, fantasyVote: 8 },
              { role: 'C', vote: 6, fantasyVote: 6 },
              { role: 'C', vote: 6, fantasyVote: 6 },
            ] as PlayerInfo[],
            A: [
              { role: 'A', vote: 6, fantasyVote: 6 },
              { role: 'A', vote: 6, fantasyVote: 6 },
              { role: 'A', vote: 6, fantasyVote: 6 },
            ] as PlayerInfo[],
          }
        },
        {
          teamId: 'team_D',
          formation: '3-4-3',
          allPlayersByRole: {
            P: [{ role: 'P', vote: 6, fantasyVote: 7.5 }] as PlayerInfo[],
            D: [
              { role: 'D', vote: 6, fantasyVote: 6 },
              { role: 'D', vote: 6, fantasyVote: 6 },
              { role: 'D', vote: 6, fantasyVote: 6 },
            ] as PlayerInfo[],
            C: [
              { role: 'C', vote: 6, fantasyVote: 6 },
              { role: 'C', vote: 6, fantasyVote: 6 },
              { role: 'C', vote: 6, fantasyVote: 6 },
              { role: 'C', vote: 6, fantasyVote: 6 },
            ] as PlayerInfo[],
            A: [
              { role: 'A', vote: 6, fantasyVote: 6 },
              { role: 'A', vote: 6, fantasyVote: 6 },
              { role: 'A', vote: 6, fantasyVote: 6 },
            ] as PlayerInfo[],
          }
        },
        {
          teamId: 'team_E',
          formation: '3-4-3',
          allPlayersByRole: {
            P: [{ role: 'P', vote: 6, fantasyVote: 4.5 }] as PlayerInfo[],
            D: [
              { role: 'D', vote: 6, fantasyVote: 6 },
              { role: 'D', vote: 6, fantasyVote: 6 },
              { role: 'D', vote: 6, fantasyVote: 6 },
            ] as PlayerInfo[],
            C: [
              { role: 'C', vote: 6, fantasyVote: 6 },
              { role: 'C', vote: 6, fantasyVote: 6 },
              { role: 'C', vote: 6, fantasyVote: 6 },
              { role: 'C', vote: 6, fantasyVote: 6 },
            ] as PlayerInfo[],
            A: [
              { role: 'A', vote: 6, fantasyVote: 6 },
              { role: 'A', vote: 6, fantasyVote: 6 },
              { role: 'A', vote: 6, fantasyVote: 6 },
            ] as PlayerInfo[],
          }
        },
      ] as TeamInfo[],
    };

    const expected = [
      {
        awayId: "team_D",
        awayPoints: 67.5,
        awayScore: 1,
        esit: "X",
        homeId: "team_A",
        homeDetails: {
          homePoints: 68,
          homeScore: 1,
        },
        id: 1,
        score: "1 - 1",
      },
      {
        awayId: "team_D",
        awayPoints: 67.5,
        awayScore: 1,
        esit: "1",
        homeId: "team_C",
        homeDetails: {
          homePoints: 73,
          homeScore: 2,
        },
        id: 2,
        score: "2 - 1",
      }, {
        awayId: "team_D",
        awayPoints: 67.5,
        awayScore: 1,
        esit: "2",
        homeId: "team_E",
        homeDetails: {
          homePoints: 64.5,
          homeScore: 0,
        },
        id: 3,
        score: "0 - 1",
      }
    ]

    const actual = processRound(given.calendarMatches, given.teamsInfo);

    expect(actual).toEqual(expected);
  })
})