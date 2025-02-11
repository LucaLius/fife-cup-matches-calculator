import { describe, expect, test } from '@jest/globals';
import { MatchDayCombinationsEliminationPhaseBuilder } from './match-day-combination-elimination-phase.builder';

/* eslint-env jest */

describe('match-day-combination-elimination-phase builder', () => {

  test('Should create an istance without errors', () => {
    const matchDayCombinationsEliminationPhaseBuilder = new MatchDayCombinationsEliminationPhaseBuilder();
    const actual = matchDayCombinationsEliminationPhaseBuilder;

    expect(actual).toBeDefined();
  });

  test('Should get the match day combinations', () => {
    const matchDayCombinationsEliminationPhaseBuilder = new MatchDayCombinationsEliminationPhaseBuilder();
    const actual = matchDayCombinationsEliminationPhaseBuilder.getMatchDayCombinations();

    expect(actual).toBeDefined();
  });


  test('Should get exactly one match day combination: A and B', () => {
    const matchDayCombinationsEliminationPhaseBuilder = new MatchDayCombinationsEliminationPhaseBuilder();
    const actual = matchDayCombinationsEliminationPhaseBuilder.getMatchDayCombinations();

    expect(actual).toBeDefined();
  });

})

