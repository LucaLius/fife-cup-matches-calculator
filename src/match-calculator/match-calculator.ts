import { CalendarMatchEsit } from '../models/calendar-match-esit.model';
import { TeamInfo } from '../models/team-info.model';
import { MatchCalculatorI } from './match-calculator.interface';
import { getGoalsScored } from './src/goals-scored-getter';
import { getMatchEsit } from './src/match-esit-getter';
import { getTeamsPointsScored } from './src/team-points-scored-getter';

export class MatchCalculator implements MatchCalculatorI {

  calcuate(id: number, homeTeamInfo: TeamInfo, awayTeamInfo: TeamInfo): CalendarMatchEsit {

    const homeTeamPointsScored = getTeamsPointsScored(homeTeamInfo);
    const awayTeamPointsScored = getTeamsPointsScored(awayTeamInfo);
    const homeTeamGoalsScored = getGoalsScored(homeTeamPointsScored);
    const awayTeamGoalsScored = getGoalsScored(awayTeamPointsScored);
    const esit = getMatchEsit(homeTeamGoalsScored, awayTeamGoalsScored);
    return {
      id,
      esit,
      homeId: homeTeamInfo.teamId,
      awayId: awayTeamInfo.teamId,
      score: `${homeTeamGoalsScored} - ${awayTeamGoalsScored}`,
      homeScore: homeTeamGoalsScored,
      homePoints: homeTeamPointsScored,
      awayScore: awayTeamGoalsScored,
      awayPoints: awayTeamPointsScored,
    } as CalendarMatchEsit
  }

}