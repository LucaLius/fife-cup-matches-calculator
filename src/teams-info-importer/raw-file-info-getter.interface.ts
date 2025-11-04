// Used to get portions of the raw data 

import { ColumnIndexes, RowIndexes } from "../models/file-indexes.model";

export interface RawFileInfoGetterI {

  getFileNameRow(fileContent: string[][]): string[][];

  getMatchFileRows(fileContent: string[][], matchIndex: number): string[][];

  // return all the row indexes pointing to first line of match block 
  getMatchesStartingIndexes(fileContent: (string | number)[][]): number[];

  // from a list of rows extracted from file that contains info for both teams, 
  // return a list of "cleaned" rows for players of one single team
  getRawTeamTitolari(matchFileRows: (string | number)[][], rowIndexes: RowIndexes, columnIndexes: ColumnIndexes): (string | number)[][];

  // from a list of rows extracted from file that contains info for both teams, 
  // return a list of "cleaned" rows for players of one single team
  getRawTeamPanchinari(matchFileRows: (string | number)[][], rowIndexes: RowIndexes, columnIndexes: ColumnIndexes): (string | number)[][];

  getRawAllPlayers(matchFileRows: string[][]): (string | number)[][];

}