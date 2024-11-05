import { CalendarMatchEsit } from './../models/calendar-match-esit.model';
// import xlsx from 'node-xlsx';
import * as fs from 'fs';
import { OUTPUT_FILES_TEAMS_DIR_PATH } from '../output-files/output-files.utils';
import { OUTPUT_FILES_GENERATOR_TEMPLATE_FILE_PATH } from './output-files-generator.utils';

export function createOutputFiles(result: CalendarMatchEsit[]): void {

  const resultsGrouped = groupMatches(result);

  generateTemplateFiles(resultsGrouped);

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

function generateTemplateFiles(resultsGrouped: { groupId: number, matches: CalendarMatchEsit[] }[]) {
  resultsGrouped.forEach((group, index) => {
    group.matches.forEach((match) => {
      const mappedGroupId = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][index];
      const src = OUTPUT_FILES_GENERATOR_TEMPLATE_FILE_PATH;
      const dest = `${OUTPUT_FILES_TEAMS_DIR_PATH}/Giornata ${match.matchNumber} - Girone ${mappedGroupId}.xlsx`;
      fs.copyFileSync(src, dest);
    });
  });
}