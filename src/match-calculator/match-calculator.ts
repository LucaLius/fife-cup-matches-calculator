import { CalendarMatchEsit } from '../models/calendar-match-esit.model';
import { TeamInfo } from '../models/team-info.model';
import { MatchCalculatorI } from './match-calculator.interface';
import { getGoalsScored } from './src/goals-scored-getter';
import { getMatchEsit } from './src/match-esit-getter';

export class MatchCalculator implements MatchCalculatorI {

  calcuate(id: number, homeTeamInfo: TeamInfo, awayTeamInfo: TeamInfo): CalendarMatchEsit {

    const homeTeamGoalsScored = getGoalsScored(homeTeamInfo.pointsScored);
    const awayTeamGoalsScored = getGoalsScored(awayTeamInfo.pointsScored);
    const esit = getMatchEsit(homeTeamGoalsScored, awayTeamGoalsScored);
    return {
      id,
      esit
    } as CalendarMatchEsit
  }

}