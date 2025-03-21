import { MatchDayCombinations } from "../../calendar-importer.interface";
import { MatchDayCombinationsBuilder } from './match-day-combinations-builder.interface';

export class MatchDayCombinationsEliminationPhaseBuilder implements MatchDayCombinationsBuilder {
  // In the elimination phase I only have teamA vs teamB, so this class has very few logics.
  // The key of matchDayCombinations is not used. To ensure that only one is used.

  readonly matchDayCombinations: MatchDayCombinations;

  constructor() {
    this.matchDayCombinations = {
      1: combinationsMatchDayOne, // last sixteens
      2: combinationsMatchDayOne, // quarter finals
      3: combinationsMatchDayOne, // semi finals
      4: combinationsMatchDayOne // final
    };
  }
  getMatchDayCombinations(): MatchDayCombinations {
    return this.matchDayCombinations;
  }

}

const combinationsMatchDayOne = [
  {
    homeTeamGroup: 'A',
    awayTeamGroup: 'B',
  }
];
