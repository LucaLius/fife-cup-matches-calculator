import { CalendarMatch } from "../models/calendar-match.model";
import { CalendarImporterI } from "./calendar-importer.interface";

export class CalendarImporter implements CalendarImporterI {

  getCalendarMatches(): CalendarMatch[] {
    return [];
  }

}