import { Combination } from "../../models/group-stage-combination.model";

const combinationsMatchDayOne = [
  {
    homeTeamGroup: 'A',
    awayTeamGroup: 'B',
  },
  {
    homeTeamGroup: 'C',
    awayTeamGroup: 'D',
  }
] as unknown as Combination[];

const combinationsMatchDayTwo = [
  {
    homeTeamGroup: 'A',
    awayTeamGroup: 'C',
  },
  {
    homeTeamGroup: 'B',
    awayTeamGroup: 'D',
  }
] as unknown as Combination[];


const combinationsMatchDayThree = [
  {
    homeTeamGroup: 'A',
    awayTeamGroup: 'D',
  },
  {
    homeTeamGroup: 'B',
    awayTeamGroup: 'C',
  }
] as unknown as Combination[];


const combinationsMatchDayFour = combinationsMatchDayOne;
const combinationsMatchDayFive = combinationsMatchDayTwo;
const combinationsMatchDaySix = combinationsMatchDayThree;

export const combinations_24_25_season = {
  combinationsMatchDayOne,
  combinationsMatchDayTwo,
  combinationsMatchDayThree,
  combinationsMatchDayFour,
  combinationsMatchDayFive,
  combinationsMatchDaySix
};
