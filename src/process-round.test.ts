import { describe, expect, test } from '@jest/globals';
import { processRound } from './process-round';

/* eslint-env jest */

describe('processRound()', () => {
  test('Should say who won between home and visitors teams', () => {
    // const given = {
    //   calendarMatches: [
    //     {
    //       id: 1,
    //       home: "team_A",
    //       away: "team_B",
    //     }
    //   ],
    //   results: [
    //     {
    //       teamId: 'team_A',
    //       points: 66
    //     },
    //     {
    //       teamId: 'team_B',
    //       points: 66
    //     },
    //   ]
    // };

    const expected = {
      calendarMatchesEsit: [
        {
          id: 1,
          esit: "X"
        }
      ]
    }

    const actual = processRound();

    expect(actual.calendarMatchesEsit[0].esit).toEqual(expected.calendarMatchesEsit[0].esit)
  })
})