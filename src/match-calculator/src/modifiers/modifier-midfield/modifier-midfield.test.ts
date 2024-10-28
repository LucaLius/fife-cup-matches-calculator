import { FormationAnalyzer } from '../../formation-analyzer';
import { ModifierMidfield } from './modifier-midfield';
import { describe, expect, test } from '@jest/globals';
import { TeamInfo } from '../../../../models/team-info.model';
import { PlayerInfoAVoto } from '../../../../models/player-info.model';

/* eslint-env jest */

describe('ModifierMidfield.calculate()', () => {
  test('Should calculate how many points from midfielders modifier (simple case with same C number in teams, 1)', () => {
    const given = {
      teamInfoA: {
        teamId: 'teamA',
        formation: '4-4-2'
      } as TeamInfo,
      teamInfoB: {
        teamId: 'teamB',
        formation: '4-4-2'
      } as TeamInfo,
      allPlayersA:
        [
          { role: 'C', vote: 6 },
          { role: 'C', vote: 6 },
          { role: 'C', vote: 6 },
          { role: 'C', vote: 6 },
        ] as PlayerInfoAVoto[],
      allPlayersB:
        [
          { role: 'C', vote: 6 },
          { role: 'C', vote: 6 },
          { role: 'C', vote: 6 },
          { role: 'C', vote: 6 },
        ] as PlayerInfoAVoto[]
    };

    const expected = { teamId: 'teamA', points: 0 };

    const modifierMidfield = new ModifierMidfield(given.teamInfoA.teamId, given.teamInfoB.teamId, given.allPlayersA, given.allPlayersB);
    const formationAnalyzerA = new FormationAnalyzer(given.teamInfoA);
    const formationAnalyzerB = new FormationAnalyzer(given.teamInfoB);
    const actual = modifierMidfield.calculate([formationAnalyzerA, formationAnalyzerB]);

    expect(actual).toEqual(expected);
  });

  test('Should calculate how many points from midfielders modifier (simple case with same C number in teams, 2)', () => {
    const given = {
      teamInfoA: {
        teamId: 'teamA',
        formation: '4-4-2'
      } as TeamInfo,
      teamInfoB: {
        teamId: 'teamB',
        formation: '4-4-2'
      } as TeamInfo,
      allPlayersA:
        [
          { role: 'C', vote: 6 },
          { role: 'C', vote: 5 },
          { role: 'C', vote: 6 },
          { role: 'C', vote: 5 },
        ] as PlayerInfoAVoto[],
      allPlayersB:
        [
          { role: 'C', vote: 6 },
          { role: 'C', vote: 7 },
          { role: 'C', vote: 7 },
          { role: 'C', vote: 6 },
        ] as PlayerInfoAVoto[]
    };

    const expected = { teamId: 'teamB', points: 2 };

    const modifierMidfield = new ModifierMidfield(given.teamInfoA.teamId, given.teamInfoB.teamId, given.allPlayersA, given.allPlayersB);
    const formationAnalyzerA = new FormationAnalyzer(given.teamInfoA);
    const formationAnalyzerB = new FormationAnalyzer(given.teamInfoB);
    const actual = modifierMidfield.calculate([formationAnalyzerA, formationAnalyzerB]);

    expect(actual).toEqual(expected);
  })

  test('Should calculate how many points from midfielders modifier (simple case with same C number in teams, 3)', () => {
    const given = {
      teamInfoA: {
        teamId: 'teamA',
        formation: '4-4-2'
      } as TeamInfo,
      teamInfoB: {
        teamId: 'teamB',
        formation: '4-4-2'
      } as TeamInfo,
      allPlayersA:
        [
          { role: 'C', vote: 6 },
          { role: 'C', vote: 7 },
          { role: 'C', vote: 6.5 },
          { role: 'C', vote: 7 },
        ] as PlayerInfoAVoto[],
      allPlayersB:
        [
          { role: 'C', vote: 6 },
          { role: 'C', vote: 6 },
          { role: 'C', vote: 6.5 },
          { role: 'C', vote: 6 },
        ] as PlayerInfoAVoto[]
    };

    const expected = { teamId: 'teamA', points: 2 };

    const modifierMidfield = new ModifierMidfield(given.teamInfoA.teamId, given.teamInfoB.teamId, given.allPlayersA, given.allPlayersB);
    const formationAnalyzerA = new FormationAnalyzer(given.teamInfoA);
    const formationAnalyzerB = new FormationAnalyzer(given.teamInfoB);
    const actual = modifierMidfield.calculate([formationAnalyzerA, formationAnalyzerB]);

    expect(actual).toEqual(expected);
  })

  test('Should calculate how many points from midfielders modifier (medium case with different C number in teams, 3)', () => {
    const given = {
      teamInfoA: {
        teamId: 'teamA',
        formation: '4-4-2'
      } as TeamInfo,
      teamInfoB: {
        teamId: 'teamB',
        formation: '4-5-1'
      } as TeamInfo,
      allPlayersA:
        [
          { role: 'C', vote: 6 },
          { role: 'C', vote: 6 },
          { role: 'C', vote: 6 },
          { role: 'C', vote: 6 },
        ] as PlayerInfoAVoto[],
      allPlayersB:
        [
          { role: 'C', vote: 7 },
          { role: 'C', vote: 6 },
          { role: 'C', vote: 6 },
          { role: 'C', vote: 6 },
          { role: 'C', vote: 6 },
        ] as PlayerInfoAVoto[]
    };

    const expected = { teamId: 'teamB', points: 2 };

    const modifierMidfield = new ModifierMidfield(given.teamInfoA.teamId, given.teamInfoB.teamId, given.allPlayersA, given.allPlayersB);
    const formationAnalyzerA = new FormationAnalyzer(given.teamInfoA);
    const formationAnalyzerB = new FormationAnalyzer(given.teamInfoB);
    const actual = modifierMidfield.calculate([formationAnalyzerA, formationAnalyzerB]);

    expect(actual).toEqual(expected);
  })
})