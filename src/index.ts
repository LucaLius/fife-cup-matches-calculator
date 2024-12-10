import { CalendarImporter } from "./calendar-importer/calendar-importer";
import { INPUT_FILES_TEAMS_DIR_PATH } from "./input-files/input-files.utils";
import { CalendarMatch } from "./models/calendar-match.model";
import { TeamInfo } from "./models/team-info.model";
import { createOutputFiles } from "./output-files-generator/output-files-generator";
import { processRound } from "./process-round";
import { TeamsInfoImporter } from "./teams-info-importer/teams-info-importer";

const calendarMatches: CalendarMatch[] = new CalendarImporter().getCalendarMatches(4);
const teamsInfo: TeamInfo[] = new TeamsInfoImporter(INPUT_FILES_TEAMS_DIR_PATH).getTeamsInfo();

const result = processRound(calendarMatches, teamsInfo);
console.log(result);

createOutputFiles(result);