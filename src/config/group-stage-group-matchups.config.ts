const combinationsMatchDayOne = [
  {
    homeTeamGroup: 'A',
    awayTeamGroup: 'D',
  },
  {
    homeTeamGroup: 'C',
    awayTeamGroup: 'D',
  }
];

const combinationsMatchDayTwo = [
  {
    homeTeamGroup: 'D',
    awayTeamGroup: 'C',
  },
  {
    homeTeamGroup: 'A',
    awayTeamGroup: 'B',
  }
];


const combinationsMatchDayThree = [
  {
    homeTeamGroup: 'C',
    awayTeamGroup: 'A',
  },
  {
    homeTeamGroup: 'B',
    awayTeamGroup: 'D',
  }
];


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
