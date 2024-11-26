// Used to get portions of the raw data 

import { ColumnIndexes, RowIndexes } from "../models/file-indexes.model";

export class RawFileInfoGetter {


  // from a list of rows extracted from file that contains info for both teams, 
  // return a list of "cleaned" rows for players of one single team
  static getRawTeamTitolari(matchFileRows: (string | number)[][], rowIndexes: RowIndexes, columnIndexes: ColumnIndexes) {
    const rawRows = this.getRawTitolariRows(matchFileRows, rowIndexes);
    return rawRows.map(row => this.getPlayerRawInfo(row, columnIndexes));
  }

  // from a list of rows extracted from file that contains info for both teams, 
  // return a list of "cleaned" rows for players of one single team
  static getRawTeamPanchinari(matchFileRows: (string | number)[][], rowIndexes: RowIndexes, columnIndexes: ColumnIndexes) {
    const rawRows = this.getRawPanchinariRows(matchFileRows, rowIndexes);
    return rawRows.map(row => this.getPlayerRawInfo(row, columnIndexes));
  }

  private static getPlayerRawInfo(player: (string | number)[], columnIndexes: ColumnIndexes): (string | number)[] {
    return [
      player[columnIndexes.rolePlayerIndex],
      player[columnIndexes.namePlayerIndex],
      player[columnIndexes.serieATeamInex],
      player[columnIndexes.votePlayerIndex],
      player[columnIndexes.fantasyVotePlayerIndex],
    ];
  }

  static getRawAllPlayers(matchFileRows: string[][], rowIndexes: RowIndexes) {
    return [
      ...this.getRawTitolariRows(matchFileRows, rowIndexes),
      ...this.getRawPanchinariRows(matchFileRows, rowIndexes)
    ];
  }

  private static getRawTitolariRows(matchFileRows: (string | number)[][], rowIndexes: RowIndexes): (string | number)[][] {
    return matchFileRows.slice(rowIndexes.firstTitolareIndex, rowIndexes.lastTitolareIndex + 1);
  }

  private static getRawPanchinariRows(matchFileRows: (string | number)[][], rowIndexes: RowIndexes): (string | number)[][] {
    return matchFileRows.slice(rowIndexes.firstPanchinaroIndex, rowIndexes.lastPanchinaroIndex + 1);
  }
}