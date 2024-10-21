import { CalendarMatch } from './models/calendar-match.model';
import { MatchCalculator } from "./match-calculator/match-calculator";
import { CalendarMatchEsit } from "./models/calendar-match-esit.model";
import { TeamInfo } from "./models/team-info.model";

export function processRound(calendarMatches: CalendarMatch[], teamsInfo: TeamInfo[]): CalendarMatchEsit[] {
  return calendarMatches.map(calendarMatch => {
    const teamAInfo = teamsInfo.find(teamInfo => teamInfo.teamId === calendarMatch.homeId);
    const teamBInfo = teamsInfo.find(teamInfo => teamInfo.teamId === calendarMatch.awayId);
    if (!teamAInfo || !teamBInfo) {
      throw new Error("All teams info must be found!");
    }
    return new MatchCalculator().calcuate(calendarMatch.id, teamAInfo, teamBInfo);
  });
}

