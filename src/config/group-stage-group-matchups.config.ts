import { Combination } from "../models/group-stage-combination.model";

const combinationsMatchDayOne = [
  {
    homeTeamGroup: 'A',
    awayTeamGroup: 'D',
  },
  {
    homeTeamGroup: 'C',
    awayTeamGroup: 'B',
  }
] as unknown as Combination[];


const combinationsMatchDayTwo = [
  {
    homeTeamGroup: 'D',
    awayTeamGroup: 'C',
  },
  {
    homeTeamGroup: 'A',
    awayTeamGroup: 'B',
  }
] as unknown as Combination[];



const combinationsMatchDayThree = [
  {
    homeTeamGroup: 'C',
    awayTeamGroup: 'A',
  },
  {
    homeTeamGroup: 'B',
    awayTeamGroup: 'D',
  }
] as unknown as Combination[];



const combinationsMatchDayFour = combinationsMatchDayOne;
const combinationsMatchDayFive = combinationsMatchDayTwo;
const combinationsMatchDaySix = combinationsMatchDayThree;

export const combinationsCurrentSeason = {
  combinationsMatchDayOne,
  combinationsMatchDayTwo,
  combinationsMatchDayThree,
  combinationsMatchDayFour,
  combinationsMatchDayFive,
  combinationsMatchDaySix
};

