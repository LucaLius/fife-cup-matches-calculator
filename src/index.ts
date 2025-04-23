import { MatchDayCombinationsEliminationPhaseBuilder } from "./calendar-importer/builders/match-day-combinations-builder/match-day-combination-elimination-phase.builder";
import { MatchDayCombinationsGroupStageBuilder } from "./calendar-importer/builders/match-day-combinations-builder/match-day-combination-group-stage.builder";
import { MatchDayCombinationsBuilder } from "./calendar-importer/builders/match-day-combinations-builder/match-day-combinations-builder.interface";
import { CalendarImporter } from "./calendar-importer/calendar-importer";
import { INPUT_FILES_TEAMS_DIR_PATH } from "./config/variables.config";
import { TeamInfo } from "./models/team-info.model";
import { createOutputFiles } from "./output-files-generator/output-files-generator";
import { TeamsInfoImporter } from "./teams-info-importer/teams-info-importer";
import { GroupCompositionFactory } from "./calendar-importer/group-composition-factory";
import { Competition } from "./enums/competition.enum";
import { CalendarMatch } from "./models/calendar-match.model";
import { MatchCalculator } from "./match-calculator/match-calculator";
import { CalendarMatchEsit } from "./models/calendar-match-esit.model";

type MainProcessParams = {
  competition: Competition,
  round: number
};

export function mainProcess(params: MainProcessParams) {

  const calendarMatches = getCalendarMatches(params);
  const teamsInfo = getTeamsInfo();

  const result = processRound(calendarMatches, teamsInfo);

  // TODO: try to return the files zipped instead
  createOutputFiles(params.competition, result);

  return { esit: "Success", params };
}

export function processRound(calendarMatches: CalendarMatch[], teamsInfo: TeamInfo[]): CalendarMatchEsit[] {
  return calendarMatches.map(calendarMatch => {
    const home = teamsInfo.find(teamInfo => teamInfo.teamId === calendarMatch.homeId);
    const away = teamsInfo.find(teamInfo => teamInfo.teamId === calendarMatch.awayId);
    if (!home || !away) {
      throw new Error(`All teams info must be found! Home: ${!!home}, Away: ${!!away} (homeId: ${calendarMatch.homeId}, awayId: ${calendarMatch.awayId})`);
    }
    const calendarMatchInfo = { home, away };
    return new MatchCalculator().calcuate(calendarMatch, calendarMatchInfo);
  });
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
  const filesExtraction = new TeamsInfoImporter(INPUT_FILES_TEAMS_DIR_PATH).getTeamsInfo();
  return filesExtraction.teamsInfo;
}
