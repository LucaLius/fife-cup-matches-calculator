import { CalendarMatchEsit } from '../models/calendar-match-esit.model';
import { CalendarMatchInfo } from '../models/calendar-match-info.model';
import { CalendarMatch } from '../models/calendar-match.model';
import { TeamInfo } from '../models/team-info.model';
import { MatchCalculatorI } from './match-calculator.interface';
import { getGoalsScored } from './src/goals-scored-getter';
import { getMatchEsit } from './src/match-esit-getter';
import { DetailModifier } from './src/modifiers/modifiers-manager';
import { getCrossTeamsPointsScored, getTeamsPointsScored } from './src/team-points-scored-getter';

export class MatchCalculator implements MatchCalculatorI {

  calcuate(calendarMatch: CalendarMatch, calendarMatchInfo: CalendarMatchInfo): CalendarMatchEsit {

    const homeTeamPointsScored = getTeamsPointsScored(calendarMatchInfo.home);
    const awayTeamPointsScored = getTeamsPointsScored(calendarMatchInfo.away);

    let homeTotalPointsScored = homeTeamPointsScored.totalPoints;
    let awayTotalPointsScored = awayTeamPointsScored.totalPoints;

    const crossTeamsPointsScored = getCrossTeamsPointsScored(calendarMatchInfo.home, calendarMatchInfo.away);
    crossTeamsPointsScored.totalModifiers.forEach(el => {
      if (el.teamId === calendarMatchInfo.home.teamId) {
        homeTotalPointsScored += el.points;
      }
      if (el.teamId === calendarMatchInfo.away.teamId) {
        awayTotalPointsScored += el.points;
      }
    });

    const homeTeamGoalsScored = getGoalsScored(homeTotalPointsScored);
    const awayTeamGoalsScored = getGoalsScored(awayTotalPointsScored);
    const esit = getMatchEsit(homeTeamGoalsScored, awayTeamGoalsScored);

    const result = new CalendarMatchEsit();
    result.id = calendarMatch.id;
    result.idGroup = calendarMatch.idGroup;
    result.matchNumber = calendarMatch.matchNumber;
    result.esit = esit;
    result.homeId = calendarMatchInfo.home.teamId;
    result.awayId = calendarMatchInfo.away.teamId;
    result.score = `${homeTeamGoalsScored} - ${awayTeamGoalsScored}`;
    result.homeDetails = {
      fantasyPoints: homeTotalPointsScored,
      matchScore: homeTeamGoalsScored,
      crossTeamModifiers: this.filterModifiers(calendarMatchInfo.home, crossTeamsPointsScored),
      baseModifiers: homeTeamPointsScored.modifiers.detailModifiers
    };

    result.awayDetails = {
      fantasyPoints: awayTotalPointsScored,
      matchScore: awayTeamGoalsScored,
      crossTeamModifiers: this.filterModifiers(calendarMatchInfo.away, crossTeamsPointsScored),
      baseModifiers: awayTeamPointsScored.modifiers.detailModifiers
    };

    return result;
  }

  private filterModifiers(teamInfo: TeamInfo, modifiers: { detailModifiers: DetailModifier[] }): DetailModifier[] {
    return modifiers.detailModifiers.filter(el => el.teamId === teamInfo.teamId);
  }

}