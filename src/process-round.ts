import { CalendarMatch } from './models/calendar-match.model';
import { MatchCalculator } from "./match-calculator/match-calculator";
import { CalendarMatchEsit } from "./models/calendar-match-esit.model";
import { TeamInfo } from "./models/team-info.model";

export function processRound(calendarMatches: CalendarMatch[], teamsInfo: TeamInfo[]): CalendarMatchEsit[] {
  return calendarMatches.map(calendarMatch => {
    const home = teamsInfo.find(teamInfo => teamInfo.teamId === calendarMatch.homeId);
    const away = teamsInfo.find(teamInfo => teamInfo.teamId === calendarMatch.awayId);
    if (!home || !away) {
      throw new Error(`All teams info must be found! Home: ${!!home}, Away: ${!!away} (homeId: ${calendarMatch.homeId}, awayId: ${calendarMatch.awayId})`);
    }
    const calendarMatchInfo = { home, away };
    return new MatchCalculator().calcuate(calendarMatch, calendarMatchInfo);
  });
}

