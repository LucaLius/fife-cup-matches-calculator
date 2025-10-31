import { combinationsCurrentSeason } from "../../../config/group-stage-group-matchups.config";
import { combinations_24_25_season } from "../../../config/old/group-stage-group-matchups-25_25_season.config";
import { MatchDayCombinations } from "../../calendar-importer.interface";
import { MatchDayCombinationsBuilder } from './match-day-combinations-builder.interface';

export class MatchDayCombinationsGroupStageBuilder implements MatchDayCombinationsBuilder {

  readonly matchDayCombinations: MatchDayCombinations;

  constructor(oldSeason?: '24_25') {

    let combinations;

    if (oldSeason === '24_25') {
      combinations = combinations_24_25_season;
    } else {
      combinations = combinationsCurrentSeason;
    }

    this.matchDayCombinations = {
      1: combinations.combinationsMatchDayOne,
      2: combinations.combinationsMatchDayTwo,
      3: combinations.combinationsMatchDayThree,
      4: combinations.combinationsMatchDayFour,
      5: combinations.combinationsMatchDayFive,
      6: combinations.combinationsMatchDaySix,
    };
  }
  getMatchDayCombinations(): MatchDayCombinations {
    return this.matchDayCombinations;
  }

}
