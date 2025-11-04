// Used to get portions of the raw data 

import { ColumnIndexes, RowIndexes } from "../models/file-indexes.model";
import { RawFileInfoGetterI } from "./raw-file-info-getter.interface";
import { TeamsInfoImporterConfig } from "./teams-info-importer.config";

export class RawFileInfoGetter implements RawFileInfoGetterI {


  public getFileNameRow(fileContent: string[][]): string[][] {
    return fileContent.slice(0, 1); // I alwys the first row
  }


  public getMatchFileRows(fileContent: string[][], matchIndex: number): string[][] {
    const matchesInfoIndexes = this.getMatchesStartingIndexes(fileContent);
    const startingRowIndex = matchesInfoIndexes[matchIndex];
    const maximumRowIndex = matchesInfoIndexes[matchIndex + 1] || 999;
    return fileContent.slice(startingRowIndex, maximumRowIndex);
  }

  // return all the row indexes pointing to first line of match block 
  public getMatchesStartingIndexes(fileContent: (string | number)[][]): number[] {
    const fileContentIndexed = fileContent.map((row, index) => ({ row, index }));

    // is always the one row with "Team name", <4 empty items>, "Result like N-N", "Team name"
    const generalInfoRows = fileContentIndexed.filter(el => {
      return el.row[0] && !Number.isFinite(el.row[0]) &&
        el.row[5] && (el.row[5] as string).match(/[\d]-[\d]/g) &&
        el.row[6] && !Number.isFinite(el.row[6]);
    });

    return generalInfoRows.map(el => el.index);
  }

  // from a list of rows extracted from file that contains info for both teams, 
  // return a list of "cleaned" rows for players of one single team
  public getRawTeamTitolari(matchFileRows: (string | number)[][], rowIndexes: RowIndexes, columnIndexes: ColumnIndexes): (string | number)[][] {
    const rawRows = this.getRawTitolariRows(matchFileRows, rowIndexes);
    return rawRows.map(row => this.getPlayerRawInfo(row, columnIndexes));
  }

  // from a list of rows extracted from file that contains info for both teams, 
  // return a list of "cleaned" rows for players of one single team
  public getRawTeamPanchinari(matchFileRows: (string | number)[][], rowIndexes: RowIndexes, columnIndexes: ColumnIndexes): (string | number)[][] {
    const rawRows = this.getRawPanchinariRows(matchFileRows, rowIndexes);
    return rawRows.map(row => this.getPlayerRawInfo(row, columnIndexes));
  }

  private getPlayerRawInfo(player: (string | number)[], columnIndexes: ColumnIndexes): (string | number)[] {
    return [
      player[columnIndexes.rolePlayerIndex],
      player[columnIndexes.namePlayerIndex],
      player[columnIndexes.serieATeamInex],
      player[columnIndexes.votePlayerIndex],
      player[columnIndexes.fantasyVotePlayerIndex],
    ];
  }

  public getRawAllPlayers(matchFileRows: string[][]): (string | number)[][] {
    const rowIndexes = TeamsInfoImporterConfig.matchInfoIndexesCalculator();
    return [
      ...this.getRawTitolariRows(matchFileRows, rowIndexes),
      ...this.getRawPanchinariRows(matchFileRows, rowIndexes)
    ];
  }

  private getRawTitolariRows(matchFileRows: (string | number)[][], rowIndexes: RowIndexes): (string | number)[][] {
    return matchFileRows.slice(rowIndexes.firstTitolareIndex, rowIndexes.lastTitolareIndex + 1);
  }

  private getRawPanchinariRows(matchFileRows: (string | number)[][], rowIndexes: RowIndexes): (string | number)[][] {
    return matchFileRows.slice(rowIndexes.firstPanchinaroIndex, rowIndexes.lastPanchinaroIndex + 1);
  }
}