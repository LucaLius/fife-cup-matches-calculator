import { GroupCompositionBuilder } from "./calendar-importer/builders/group-compositions-builder/group-composition-builder.interface";
import { ChampionsLastSixteensGroupCompositionBuilder } from "./calendar-importer/builders/group-compositions-builder/champions-last-sixteens-group-composition-builder";
import { GroupCompositionGroupStageBuilder } from "./calendar-importer/builders/group-compositions-builder/group-composition-group-stage-builder";
import { MatchDayCombinationsEliminationPhaseBuilder } from "./calendar-importer/builders/match-day-combinations-builder/match-day-combination-elimination-phase.builder";
import { MatchDayCombinationsGroupStageBuilder } from "./calendar-importer/builders/match-day-combinations-builder/match-day-combination-group-stage.builder";
import { MatchDayCombinationsBuilder } from "./calendar-importer/builders/match-day-combinations-builder/match-day-combinations-builder.interface";
import { CalendarImporter } from "./calendar-importer/calendar-importer";
import { INPUT_FILES_TEAMS_DIR_PATH } from "./input-files/input-files.utils";
import { TeamInfo } from "./models/team-info.model";
import { createOutputFiles } from "./output-files-generator/output-files-generator";
import { processRound } from "./process-round";
import { TeamsInfoImporter } from "./teams-info-importer/teams-info-importer";
import { GroupCompositionFactory } from "./calendar-importer/group-composition-factory";

// TODO: pass as runtime variables
let matchDay: number;
let competition: string; // 'GROUP_STAGE' | 'CHAMPIONS_LEAGUE';

// TODO: remove this assignments
matchDay = 1;
competition = 'CHAMPIONS_LEAGUE';

let matchDayCombinationsBuilder!: MatchDayCombinationsBuilder;
if (competition === 'GROUP_STAGE') {
  matchDayCombinationsBuilder = new MatchDayCombinationsGroupStageBuilder();
} else {
  matchDayCombinationsBuilder = new MatchDayCombinationsEliminationPhaseBuilder();
}

const groupCompositionBuilder = new GroupCompositionFactory(competition, matchDay).build();

const calendarImporter = new CalendarImporter(matchDayCombinationsBuilder, groupCompositionBuilder);
const matchDayMatches = calendarImporter.getMatchDayMatches(matchDay);
const calendarMatches = matchDayMatches ?? [];

const teamsInfo: TeamInfo[] = new TeamsInfoImporter(INPUT_FILES_TEAMS_DIR_PATH).getTeamsInfo();

const result = processRound(calendarMatches, teamsInfo);
console.log(result);

createOutputFiles(result);

// TODO: aggiungere in file di output eventuali riserve d'ufficio