/* eslint-disable no-sparse-arrays */
import { CalendarMatchEsit } from './../models/calendar-match-esit.model';
import * as fs from 'fs';
import { OUTPUT_FILES_TEAMS_DIR_PATH } from '../output-files/output-files.utils';
import { OUTPUT_FILES_GENERATOR_TEMPLATE_FILE_PATH } from './output-files-generator.utils';
import { openXlsxWorkbook } from '../excel-utils/excel-parser';
import * as XLSX from 'xlsx';
import { TeamsInfoImporter } from '../teams-info-importer/teams-info-importer';
import { INPUT_FILES_TEAMS_DIR_PATH } from '../input-files/input-files.utils';
import { TeamInfo } from '../models/team-info.model';

export function createOutputFiles(result: CalendarMatchEsit[]): void {

  const resultsGrouped = groupMatches(result);

  generateTemplateFiles(resultsGrouped);

  editGeneratedFiles(resultsGrouped);
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

function generateTemplateFiles(resultsGrouped: { groupId: number, matches: CalendarMatchEsit[] }[]): void {
  console.log("Start generating output files");
  resultsGrouped.forEach((group) => {
    group.matches.forEach((match) => {
      const src = OUTPUT_FILES_GENERATOR_TEMPLATE_FILE_PATH;
      const dest = getDestinationFileName(match.matchNumber, group.groupId);
      fs.copyFileSync(src, dest);
    });
  });
}

function getDestinationFileName(matchNumber: number, groupIndex: number): string {
  const mappedGroupId = ['-', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][groupIndex];
  return `${OUTPUT_FILES_TEAMS_DIR_PATH}/Giornata ${matchNumber} - Girone ${mappedGroupId}.xlsx`;
}

function editGeneratedFiles(resultsGrouped: { groupId: number, matches: CalendarMatchEsit[] }[]): void {
  console.log("Start editing generated files");
  resultsGrouped.forEach((group) => {
    group.matches.forEach((match, matchIndex) => {
      const dest = getDestinationFileName(match.matchNumber, group.groupId);
      const workBook: XLSX.WorkBook = openXlsxWorkbook(dest);
      const workSheet = workBook.Sheets[workBook.SheetNames[0]];

      const teamsInfo: TeamInfo[] = new TeamsInfoImporter(INPUT_FILES_TEAMS_DIR_PATH).getTeamsInfo();

      replaceHeader(workSheet, match.matchNumber);
      replaceTeamsIdAndScore(workSheet, match, matchIndex);
      replaceTeamsModule(workSheet, teamsInfo, match, matchIndex);
      replaceTeamsTotals(workSheet, match, matchIndex);
      replaceTeamsCaptainMod(workSheet, teamsInfo, match, matchIndex);
      replaceTeamsDefenseMod(workSheet, match, matchIndex);
      replaceTeamsMidfieldMod(workSheet, match, matchIndex);

      XLSX.writeFile(workBook, dest);
    });
  });
}

function replaceHeader(workSheet: XLSX.WorkSheet, matchNumber: number): void {
  const origin = 'A1';

  const replacedRow = [`Formazioni Campionato 24/25 - Giornata ${matchNumber}`];

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

function applyReplace(workSheet: XLSX.WorkSheet, replacedRow: (string | number | undefined)[], origin: string) {
  const aoa = [replacedRow];
  const opts = { origin };
  XLSX.utils.sheet_add_aoa(workSheet, aoa, opts);
}

