import { CalendarImporter } from "./calendar-importer/calendar-importer";
import { CalendarMatch } from "./models/calendar-match.model";
import { TeamInfo } from "./models/team-info.model";
import { processRound } from "./process-round";

const calendarMatches: CalendarMatch[] = new CalendarImporter().getCalendarMatches();
const teamsInfo: TeamInfo[] = [];

processRound(calendarMatches, teamsInfo);