import { MatchDayCombinationsGroupPhaseBuilder } from "./calendar-importer/builders/match-day-combination-group-phase.builder";
import { CalendarImporter } from "./calendar-importer/calendar-importer";
import { INPUT_FILES_TEAMS_DIR_PATH } from "./input-files/input-files.utils";
import { TeamInfo } from "./models/team-info.model";
import { createOutputFiles } from "./output-files-generator/output-files-generator";
import { processRound } from "./process-round";
import { TeamsInfoImporter } from "./teams-info-importer/teams-info-importer";

// TODO: pass me as runtime variable
const matchDay = 4;
const matchDayCombinationsGroupPhaseBuilder = new MatchDayCombinationsGroupPhaseBuilder();
const calendarImporter = new CalendarImporter(matchDayCombinationsGroupPhaseBuilder);
const matchDayMatches = calendarImporter.getMatchDayMatches(matchDay);
const calendarMatches = matchDayMatches ?? [];

const teamsInfo: TeamInfo[] = new TeamsInfoImporter(INPUT_FILES_TEAMS_DIR_PATH).getTeamsInfo();

const result = processRound(calendarMatches, teamsInfo);
console.log(result);

createOutputFiles(result);