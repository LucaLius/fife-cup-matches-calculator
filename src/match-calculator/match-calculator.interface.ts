import { CalendarMatchEsit } from "../models/calendar-match-esit.model";
import { CalendarMatchInfo } from "../models/calendar-match-info.model";
import { CalendarMatch } from "../models/calendar-match.model";

export interface MatchCalculatorI {

  calcuate(calendarMatch: CalendarMatch, calendarMatchInfo: CalendarMatchInfo): CalendarMatchEsit;

}