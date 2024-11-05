import { CalendarMatchEsit } from '../models/calendar-match-esit.model';
import { CalendarMatch } from '../models/calendar-match.model';
import { TeamInfo } from '../models/team-info.model';
import { MatchCalculatorI } from './match-calculator.interface';
import { getGoalsScored } from './src/goals-scored-getter';
import { getMatchEsit } from './src/match-esit-getter';
import { getCrossTeamsPointsScored, getTeamsPointsScored } from './src/team-points-scored-getter';

export class MatchCalculator implements MatchCalculatorI {

  calcuate(calendarMatch: CalendarMatch, homeTeamInfo: TeamInfo, awayTeamInfo: TeamInfo): CalendarMatchEsit {

    let homeTeamPointsScored = getTeamsPointsScored(homeTeamInfo);
    let awayTeamPointsScored = getTeamsPointsScored(awayTeamInfo);

    const crossTeamsPointsScored = getCrossTeamsPointsScored(homeTeamInfo, awayTeamInfo);
    crossTeamsPointsScored.forEach(el => {
      if (el.teamId === homeTeamInfo.teamId) {
        homeTeamPointsScored += el.points;
      }
      if (el.teamId === awayTeamInfo.teamId) {
        awayTeamPointsScored += el.points;
      }
    });

    const homeTeamGoalsScored = getGoalsScored(homeTeamPointsScored);
    const awayTeamGoalsScored = getGoalsScored(awayTeamPointsScored);
    const esit = getMatchEsit(homeTeamGoalsScored, awayTeamGoalsScored);
    return {
      id: calendarMatch.id,
      idGroup: calendarMatch.idGroup,
      matchNumber: calendarMatch.matchNumber,
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