import { CalendarMatchEsit } from "../models/calendar-match-esit.model";
import { TeamInfo } from "../models/team-info.model";

export interface MatchCalculatorI {

  calcuate(id: number, idGroup: number, homeTeamInfo: TeamInfo, awayTeamInfo: TeamInfo): CalendarMatchEsit;

}