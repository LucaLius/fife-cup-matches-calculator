import { MatchDayCombinations } from "../calendar-importer.interface";
import { MatchDayCombinationsBuilder } from './match-day-combinations-builder.interface';

export class MatchDayCombinationsGroupPhaseBuilder implements MatchDayCombinationsBuilder {

  readonly matchDayCombinations: MatchDayCombinations;

  constructor() {
    this.matchDayCombinations = {
      1: combinationsMatchDayOne,
      2: combinationsMatchDayTwo,
      3: combinationsMatchDayThree,
      4: combinationsMatchDayFour,
      5: combinationsMatchDayFive,
      6: combinationsMatchDaySix,
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
  },
  {
    homeTeamGroup: 'C',
    awayTeamGroup: 'D',
  }
];

const combinationsMatchDayTwo = [
  {
    homeTeamGroup: 'A',
    awayTeamGroup: 'C',
  },
  {
    homeTeamGroup: 'B',
    awayTeamGroup: 'D',
  }
];


const combinationsMatchDayThree = [
  {
    homeTeamGroup: 'A',
    awayTeamGroup: 'D',
  },
  {
    homeTeamGroup: 'B',
    awayTeamGroup: 'C',
  }
];


const combinationsMatchDayFour = combinationsMatchDayOne;
const combinationsMatchDayFive = combinationsMatchDayTwo;
const combinationsMatchDaySix = combinationsMatchDayThree;
