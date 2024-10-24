import { CalendarMatch } from "../models/calendar-match.model";

export interface CalendarImporterI {
  getCalendarMatches(): CalendarMatch[];
}