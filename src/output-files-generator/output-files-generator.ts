/* eslint-disable no-sparse-arrays */
import { CalendarMatchEsit } from './../models/calendar-match-esit.model';
import * as fs from 'fs';
import { OUTPUT_FILES_TEAMS_DIR_PATH } from '../output-files/output-files.utils';
import { openXlsxWorkbook } from '../excel-utils/excel-parser';
import * as XLSX from 'xlsx';
import { TeamsInfoImporter } from '../teams-info-importer/teams-info-importer';
import { INPUT_FILES_TEAMS_DIR_PATH } from '../input-files/input-files.utils';
import { TeamInfo } from '../models/team-info.model';
import { Competition } from '../enums/competition.enum';
import { OUTPUT_FILES_GENERATOR_TEMPLATE_FILE_ELIMINATION_PHASE_PATH, OUTPUT_FILES_GENERATOR_TEMPLATE_FILE_GROUP_STAGE_PATH } from './output-files-generator.utils';

export function createOutputFiles(competition: Competition, result: CalendarMatchEsit[]): void {

  const resultsGrouped = groupMatches(result);

  generateTemplateFiles(competition, resultsGrouped);

  editGeneratedFiles(competition, resultsGrouped);
}

function groupMatches(result: CalendarMatchEsit[]): { groupId: number, matches: CalendarMatchEsit[] }[] {
  const resultsGrouped: { groupId: number, matches: CalendarMatchEsit[] }[] = [];
  result.forEach(match => {
    const target = resultsGrouped.find(el => el.groupId === match.idGroup);
    if (target) {
      target.matches.push(match);
    } else {
      resultsGrouped.push({ groupId: match.idGroup, matches: [match] });
    }
  });

  return resultsGrouped;
}

function generateTemplateFiles(competition: Competition, resultsGrouped: { groupId: number, matches: CalendarMatchEsit[] }[]): void {
  console.log("Start generating output files");
  resultsGrouped.forEach((group) => {
    group.matches.forEach((match) => {
      const src = getCompetitonOutputTemplateSrc(competition);
      const dest = getDestinationFileName(competition, match.matchNumber, group.groupId);
      fs.copyFileSync(src, dest);
    });
  });
}

function getCompetitonOutputTemplateSrc(competition: Competition) {
  if (competition === Competition.GROUP_STAGE) {
    return OUTPUT_FILES_GENERATOR_TEMPLATE_FILE_GROUP_STAGE_PATH;
  }

  if (competition === Competition.CHAMPIONS_LEAGUE || competition === Competition.EUROPA_LEAGUE) {
    return OUTPUT_FILES_GENERATOR_TEMPLATE_FILE_ELIMINATION_PHASE_PATH;
  }

  return OUTPUT_FILES_GENERATOR_TEMPLATE_FILE_GROUP_STAGE_PATH;
}

function getDestinationFileName(competition: Competition, matchNumber: number, groupIndex: number): string {
  if (competition === Competition.GROUP_STAGE) {
    return getDestinationFileNameGroupStage(matchNumber, groupIndex);
  }

  if (competition === Competition.CHAMPIONS_LEAGUE || competition === Competition.EUROPA_LEAGUE) {
    return getDestinationFileNameEliminationPhase(competition, matchNumber, groupIndex);
  }

  return getDestinationFileNameGroupStage(matchNumber, groupIndex);
}

function getDestinationFileNameGroupStage(matchNumber: number, groupIndex: number): string {
  const mappedGroupId = ['-', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][groupIndex];
  return `${OUTPUT_FILES_TEAMS_DIR_PATH}/Giornata ${matchNumber} - Girone ${mappedGroupId}.xlsx`;
}

function getDestinationFileNameEliminationPhase(competition: Competition, matchNumber: number, groupIndex: number): string {
  const mappedRound = ['-', 'Last sixteens', 'Quarter finals', 'Semi finals', 'Finals'][matchNumber];
  const competitionMapped = competition === Competition.CHAMPIONS_LEAGUE ? 'Champions League' : 'Europa League';
  return `${OUTPUT_FILES_TEAMS_DIR_PATH}/${competitionMapped} round ${mappedRound} - Match ${groupIndex}.xlsx`;
}

function editGeneratedFiles(competition: Competition, resultsGrouped: { groupId: number, matches: CalendarMatchEsit[] }[]): void {
  if (competition === Competition.GROUP_STAGE) {
    editGeneratedGroupStageFiles(competition, resultsGrouped);
    return;
  }

  if (competition === Competition.CHAMPIONS_LEAGUE || competition === Competition.EUROPA_LEAGUE) {
    editGeneratedEliminationPhaseFiles(competition, resultsGrouped);
    return;
  }

  editGeneratedGroupStageFiles(competition, resultsGrouped);
}

function editGeneratedGroupStageFiles(competition: Competition, resultsGrouped: { groupId: number, matches: CalendarMatchEsit[] }[]): void {
  console.log("Start editing generated Group Stage files");
  resultsGrouped.forEach((group) => {
    group.matches.forEach((match, matchIndex) => {
      const dest = getDestinationFileName(competition, match.matchNumber, group.groupId);
      const workBook: XLSX.WorkBook = openXlsxWorkbook(dest);
      const workSheet = workBook.Sheets[workBook.SheetNames[0]];

      const fileExtraction = new TeamsInfoImporter(INPUT_FILES_TEAMS_DIR_PATH).getTeamsInfo();

      replaceHeaderGroupStage(workSheet, match.matchNumber);
      replaceTeamsIdAndScore(workSheet, match, matchIndex);
      replaceTeamsModule(workSheet, fileExtraction.teamsInfo, match, matchIndex);
      replaceTeamsTotals(workSheet, match, matchIndex);
      replaceTeamsCaptainMod(workSheet, fileExtraction.teamsInfo, match, matchIndex);
      replaceTeamsDefenseMod(workSheet, match, matchIndex);
      replaceTeamsMidfieldMod(workSheet, match, matchIndex);

      fillTeamsPlayersTitolari(workSheet, fileExtraction.teamsInfo, match, matchIndex);
      fillTeamsPlayersPanchinari(workSheet, fileExtraction.teamsInfo, match, matchIndex);

      XLSX.writeFile(workBook, dest);
    });
  });
}

function editGeneratedEliminationPhaseFiles(competition: Competition, resultsGrouped: { groupId: number, matches: CalendarMatchEsit[] }[]): void {
  console.log("Start editing generated Elimination Phase files");
  resultsGrouped.forEach((group) => {
    group.matches.forEach((match, matchIndex) => {
      const dest = getDestinationFileName(competition, match.matchNumber, group.groupId);
      const workBook: XLSX.WorkBook = openXlsxWorkbook(dest);
      const workSheet = workBook.Sheets[workBook.SheetNames[0]];

      const fileExtraction = new TeamsInfoImporter(INPUT_FILES_TEAMS_DIR_PATH).getTeamsInfo();

      replaceHeaderEliminationPhase(workSheet, competition, fileExtraction.serieAMatchNumber, match.matchNumber, group.groupId);
      replaceTeamsIdAndScore(workSheet, match, matchIndex);
      replaceTeamsModule(workSheet, fileExtraction.teamsInfo, match, matchIndex);
      replaceTeamsTotals(workSheet, match, matchIndex);
      replaceTeamsCaptainMod(workSheet, fileExtraction.teamsInfo, match, matchIndex);
      replaceTeamsDefenseMod(workSheet, match, matchIndex);
      replaceTeamsMidfieldMod(workSheet, match, matchIndex);

      fillTeamsPlayersTitolari(workSheet, fileExtraction.teamsInfo, match, matchIndex);
      fillTeamsPlayersPanchinari(workSheet, fileExtraction.teamsInfo, match, matchIndex);

      XLSX.writeFile(workBook, dest);
    });
  });
}

function replaceHeaderGroupStage(workSheet: XLSX.WorkSheet, matchNumber: number): void {
  const origin = 'A1';

  const replacedRow = [`Formazioni Campionato 24/25 - Giornata ${matchNumber}`];

  applyReplace(workSheet, replacedRow, origin);
}

function replaceHeaderEliminationPhase(workSheet: XLSX.WorkSheet, competition: Competition, serieAMatchNumber: string, roundId: number, matchId: number): void {
  const origin = 'A1';
  const competitionMapped = competition === Competition.CHAMPIONS_LEAGUE ? 'Champions League' : 'Europa League';
  const mappedRound = ['-', 'Last sixteens', 'Quarter finals', 'Semi finals', 'Finals'][roundId];

  const replacedRow = [`Formazioni ${competitionMapped} 24/25 - Giornata ${serieAMatchNumber} (${mappedRound} round, Match ${matchId})`];

  applyReplace(workSheet, replacedRow, origin);
}


function replaceTeamsIdAndScore(workSheet: XLSX.WorkSheet, match: CalendarMatchEsit, index: number): void {
  const origin = index == 0 ? 'A3' : 'A31';

  const replacedRow = [match.homeId, /*empty*/, /*empty*/, /*empty*/, /*empty*/, match.score, match.awayId];

  applyReplace(workSheet, replacedRow, origin);
}

function replaceTeamsModule(workSheet: XLSX.WorkSheet, teamsInfo: TeamInfo[], match: CalendarMatchEsit, index: number): void {
  const origin = index == 0 ? 'A4' : 'A32';

  const targetTeamInfoHome = teamsInfo.find(teamInfo => teamInfo.teamId === match.homeId);
  const targetTeamInfoAway = teamsInfo.find(teamInfo => teamInfo.teamId === match.awayId);
  const replacedRow = [targetTeamInfoHome?.formation, /*empty*/, /*empty*/, /*empty*/, /*empty*/, /*empty*/, targetTeamInfoAway?.formation];

  applyReplace(workSheet, replacedRow, origin);
}


function replaceTeamsTotals(workSheet: XLSX.WorkSheet, match: CalendarMatchEsit, index: number): void {
  const origin = index == 0 ? 'A28' : 'A56';

  const replacedRow = [match.homeDetails.fantasyPoints, /*empty*/, /*empty*/, /*empty*/, /*empty*/, /*empty*/, match.awayDetails.fantasyPoints];

  applyReplace(workSheet, replacedRow, origin);
}

function replaceTeamsCaptainMod(workSheet: XLSX.WorkSheet, teamsInfo: TeamInfo[], match: CalendarMatchEsit, index: number): void {
  const origin = index == 0 ? 'E27' : 'E55';

  const targetTeamInfoHome = teamsInfo.find(teamInfo => teamInfo.teamId === match.homeId);
  const targetTeamInfoAway = teamsInfo.find(teamInfo => teamInfo.teamId === match.awayId);
  const replacedRow = [targetTeamInfoHome?.captainPoints, /*empty*/, 'Modificatore Capitano', /*empty*/, /*empty*/, /*empty*/, targetTeamInfoAway?.captainPoints];

  applyReplace(workSheet, replacedRow, origin);
}

function replaceTeamsDefenseMod(workSheet: XLSX.WorkSheet, match: CalendarMatchEsit, index: number): void {
  const origin = index == 0 ? 'E25' : 'E53';

  const homeDefenseMod = match.homeDetails.baseModifiers.find(modifier => modifier.id === 'defense');
  const awayDefenseMod = match.awayDetails.baseModifiers.find(modifier => modifier.id === 'defense');

  const homePoints = homeDefenseMod ? homeDefenseMod.points : 0;
  const awayPoints = awayDefenseMod ? awayDefenseMod.points : 0;

  const replacedRow = [homePoints, /*empty*/, 'Modificatore difesa', /*empty*/, /*empty*/, /*empty*/, awayPoints];

  applyReplace(workSheet, replacedRow, origin);
}

function replaceTeamsMidfieldMod(workSheet: XLSX.WorkSheet, match: CalendarMatchEsit, index: number): void {
  const origin = index == 0 ? 'E26' : 'E54';

  const homeDefenseMod = match.homeDetails.crossTeamModifiers.find(modifier => modifier.id === 'midfield');
  const awayDefenseMod = match.awayDetails.crossTeamModifiers.find(modifier => modifier.id === 'midfield');

  const homePoints = homeDefenseMod ? homeDefenseMod.points : 0;
  const awayPoints = awayDefenseMod ? awayDefenseMod.points : 0;

  const replacedRow = [homePoints, /*empty*/, 'Modificatore centrocampo', /*empty*/, /*empty*/, /*empty*/, awayPoints];

  applyReplace(workSheet, replacedRow, origin);
}

function fillTeamsPlayersTitolari(workSheet: XLSX.WorkSheet, teamsInfo: TeamInfo[], match: CalendarMatchEsit, index: number): void {
  const startingRow = index == 0 ? 5 : 33;

  const teamInfoHome = teamsInfo.find(teamInfo => teamInfo.teamId === match.homeId);
  const teamInfoAway = teamsInfo.find(teamInfo => teamInfo.teamId === match.awayId);

  const homeRawTitolari = teamInfoHome?.rawTitolari || [];
  const awayRawTitolari = teamInfoAway?.rawTitolari || [];

  const count = Math.max(homeRawTitolari.length, awayRawTitolari.length);

  for (let i = 0; i < count; i++) {
    const replacedRow = getPlayersReplacedRow(homeRawTitolari, awayRawTitolari, i)

    const origin = index == 0 ? `A${i + startingRow}` : `A${i + startingRow}`;
    applyReplace(workSheet, replacedRow, origin);
  }
}

function fillTeamsPlayersPanchinari(workSheet: XLSX.WorkSheet, teamsInfo: TeamInfo[], match: CalendarMatchEsit, index: number): void {
  const startingRow = index == 0 ? 17 : 45;

  const teamInfoHome = teamsInfo.find(teamInfo => teamInfo.teamId === match.homeId);
  const teamInfoAway = teamsInfo.find(teamInfo => teamInfo.teamId === match.awayId);

  const homeRawPanchinari = teamInfoHome?.rawPanchinari || [];
  const awayRawPanchinari = teamInfoAway?.rawPanchinari || [];

  const count = Math.max(homeRawPanchinari.length, awayRawPanchinari.length);

  for (let i = 0; i < count; i++) {
    const replacedRow = getPlayersReplacedRow(homeRawPanchinari, awayRawPanchinari, i)

    const origin = index == 0 ? `A${i + startingRow}` : `A${i + startingRow}`;
    applyReplace(workSheet, replacedRow, origin);
  }
}

function getPlayersReplacedRow(homeRawPlayers: (string | number)[][], awayRawPlayers: (string | number)[][], rowIndex: number) {
  return [
    homeRawPlayers[rowIndex][0],
    homeRawPlayers[rowIndex][1],
    homeRawPlayers[rowIndex][2],
    homeRawPlayers[rowIndex][3],
    homeRawPlayers[rowIndex][4],
    /*empty*/,
    awayRawPlayers[rowIndex][0],
    awayRawPlayers[rowIndex][1],
    awayRawPlayers[rowIndex][2],
    awayRawPlayers[rowIndex][3],
    awayRawPlayers[rowIndex][4],
  ];
}


function applyReplace(workSheet: XLSX.WorkSheet, replacedRow: (string | number | undefined)[], origin: string) {
  const aoa = [replacedRow];
  const opts = { origin };
  XLSX.utils.sheet_add_aoa(workSheet, aoa, opts);
}

