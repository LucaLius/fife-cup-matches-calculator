import { CalendarImporter } from "./calendar-importer/calendar-importer";
import { CalendarMatch } from "./models/calendar-match.model";
import { TeamInfo } from "./models/team-info.model";
import { processRound } from "./process-round";
import { TeamsInfoImporter } from "./teams-info-importer/teams-info-importer";

const calendarMatches: CalendarMatch[] = new CalendarImporter().getCalendarMatches();
const teamsInfo: TeamInfo[] = new TeamsInfoImporter().getTeamsInfo();

processRound(calendarMatches, teamsInfo);