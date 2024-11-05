import { CalendarMatchEsit } from "../models/calendar-match-esit.model";
import { CalendarMatch } from "../models/calendar-match.model";
import { TeamInfo } from "../models/team-info.model";

export interface MatchCalculatorI {

  calcuate(calendarMatch: CalendarMatch, homeTeamInfo: TeamInfo, awayTeamInfo: TeamInfo): CalendarMatchEsit;

}