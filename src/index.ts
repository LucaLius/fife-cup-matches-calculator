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
import { Competition } from "./enums/competition.enum";
import { CalendarMatch } from "./models/calendar-match.model";

type MainProcessParams = {
  competition: Competition,
  round: number
};

export function mainProcess(params: MainProcessParams) {

  const calendarMatches = getCalendarMatches(params);
  const teamsInfo = getTeamsInfo();

  const result = processRound(calendarMatches, teamsInfo);

  // TODO: try to return the files zipped instead
  createOutputFiles(result);

  return { esit: "Success", params };
}

function getCalendarMatches(params: MainProcessParams): CalendarMatch[] {
  let matchDayCombinationsBuilder!: MatchDayCombinationsBuilder;

  if (params.competition === Competition.GROUP_STAGE) {
    matchDayCombinationsBuilder = new MatchDayCombinationsGroupStageBuilder();
  } else {
    matchDayCombinationsBuilder = new MatchDayCombinationsEliminationPhaseBuilder();
  }

  const groupCompositionBuilder = new GroupCompositionFactory(params.competition, params.round).build();

  const calendarImporter = new CalendarImporter(matchDayCombinationsBuilder, groupCompositionBuilder);
  const matchDayMatches = calendarImporter.getMatchDayMatches(params.round);
  const calendarMatches = matchDayMatches ?? [];

  return calendarMatches;
}

function getTeamsInfo(): TeamInfo[] {
  const teamsInfo: TeamInfo[] = new TeamsInfoImporter(INPUT_FILES_TEAMS_DIR_PATH).getTeamsInfo();
  return teamsInfo;
}
