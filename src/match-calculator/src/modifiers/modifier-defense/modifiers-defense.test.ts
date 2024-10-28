import { FormationAnalyzer } from '../../formation-analyzer';
import { ModifierDefense } from './modifier-defense';
import { describe, expect, test } from '@jest/globals';
import { TeamInfo } from '../../../../models/team-info.model';
import { PlayerInfoAVoto } from '../../../../models/player-info.model';

/* eslint-env jest */

describe('ModifierDefense.calculate()', () => {
  test('Should calculate how many points from defense modifier, (not applicable case for riserva d\'ufficio goalkeeper)', () => {
    const given = {
      teamInfo: {
        teamId: 'teamA',
        formation: '4-4-2',
      } as TeamInfo,
      allPlayers:
        [
          { role: 'P', vote: 1, isRiservaUfficio: true },
          { role: 'D', vote: 6 },
          { role: 'D', vote: 6 },
          { role: 'D', vote: 6 },
          { role: 'D', vote: 6 },
        ] as PlayerInfoAVoto[]
    };

    const expected = null;

    const modifierDefense = new ModifierDefense(given.teamInfo.teamId, given.allPlayers);
    const formationAnalyzer = new FormationAnalyzer(given.teamInfo);
    const actual = modifierDefense.calculate([formationAnalyzer]);

    expect(actual).toEqual(expected);
  });

  test('Should calculate how many points from defense modifier, (not applicable case for riserva d\'ufficio defender)', () => {
    const given = {
      teamInfo: {
        teamId: 'teamA',
        formation: '4-4-2',
      } as TeamInfo,
      allPlayers:
        [
          { role: 'P', vote: 6 },
          { role: 'D', vote: 6 },
          { role: 'D', vote: 6 },
          { role: 'D', vote: 6 },
          { role: 'D', vote: 3, isRiservaUfficio: true },
        ] as PlayerInfoAVoto[]
    };

    const expected = null;

    const modifierDefense = new ModifierDefense(given.teamInfo.teamId, given.allPlayers);
    const formationAnalyzer = new FormationAnalyzer(given.teamInfo);
    const actual = modifierDefense.calculate([formationAnalyzer]);

    expect(actual).toEqual(expected);
  })

  test('Should calculate how many points from defense modifier, (not applicable case for not enough defenders)', () => {
    const given = {
      teamInfo: {
        teamId: 'teamA',
        formation: '3-4-3'
      } as TeamInfo,
      allPlayers:
        [
          { role: 'P', vote: 6 },
          { role: 'D', vote: 6 },
          { role: 'D', vote: 6 },
          { role: 'D', vote: 6 },
        ] as PlayerInfoAVoto[]
    };

    const expected = null;

    const modifierDefense = new ModifierDefense(given.teamInfo.teamId, given.allPlayers);
    const formationAnalyzer = new FormationAnalyzer(given.teamInfo);
    const actual = modifierDefense.calculate([formationAnalyzer]);

    expect(actual).toEqual(expected);
  })

  test('Should calculate how many points from defense modifier, (case easy with bonus == 1)', () => {
    const given = {
      teamInfo: {
        teamId: 'teamA',
        formation: '4-4-2',
      } as TeamInfo,
      allPlayers:
        [
          { role: 'P', vote: 6 },
          { role: 'D', vote: 6 },
          { role: 'D', vote: 6 },
          { role: 'D', vote: 6 },
          { role: 'D', vote: 6 },
        ] as PlayerInfoAVoto[]
    };

    const expected = { teamId: 'teamA', points: 1 };

    const modifierDefense = new ModifierDefense(given.teamInfo.teamId, given.allPlayers);
    const formationAnalyzer = new FormationAnalyzer(given.teamInfo);
    const actual = modifierDefense.calculate([formationAnalyzer]);

    expect(actual).toEqual(expected);
  })

  test('Should calculate how many points from defense modifier, (case medium with bonus == 1 but unordered vote defenders)', () => {
    const given = {
      teamInfo: {
        teamId: 'teamA',
        formation: '4-4-2',
      } as TeamInfo,
      allPlayers:
        [
          { role: 'P', vote: 6 },
          { role: 'D', vote: 5 },
          { role: 'D', vote: 5 },
          { role: 'D', vote: 6 },
          { role: 'D', vote: 7 },
        ] as PlayerInfoAVoto[]
    };

    const expected = { teamId: 'teamA', points: 1 };

    const modifierDefense = new ModifierDefense(given.teamInfo.teamId, given.allPlayers);
    const formationAnalyzer = new FormationAnalyzer(given.teamInfo);
    const actual = modifierDefense.calculate([formationAnalyzer]);

    expect(actual).toEqual(expected);
  })

  test('Should calculate how many points from defense modifier, (case medium with bonus == 3 but unordered vote defenders)', () => {
    const given = {
      teamInfo: {
        teamId: 'teamA',
        formation: '4-4-2',
      } as TeamInfo,
      allPlayers:
        [
          { role: 'P', vote: 5 },
          { role: 'D', vote: 7 },
          { role: 'D', vote: 5 },
          { role: 'D', vote: 6.5 },
          { role: 'D', vote: 7 },
        ] as PlayerInfoAVoto[]
    };

    const expected = { teamId: 'teamA', points: 2 };

    const modifierDefense = new ModifierDefense(given.teamInfo.teamId, given.allPlayers);
    const formationAnalyzer = new FormationAnalyzer(given.teamInfo);
    const actual = modifierDefense.calculate([formationAnalyzer]);

    expect(actual).toEqual(expected);
  })
})