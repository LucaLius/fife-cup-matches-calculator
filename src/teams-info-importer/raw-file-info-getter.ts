// Used to get portions of the raw data 

import { ColumnIndexes, RowIndexes } from "../models/file-indexes.model";

export class RawFileInfoGetter {

  static getPlayerRawInfo(player: string[], columnIndexes: ColumnIndexes): string[] {
    return [
      player[columnIndexes.rolePlayerIndex],
      player[columnIndexes.namePlayerIndex],
      player[columnIndexes.serieATeamInex],
      player[columnIndexes.votePlayerIndex],
      player[columnIndexes.fantasyVotePlayerIndex],
    ];
  }

  static getRawAllPlayers(fileContent: string[][], rowIndexes: RowIndexes) {
    return [
      ...this.getRawTitolariRows(fileContent, rowIndexes),
      ...this.getRawPanchinariRows(fileContent, rowIndexes)
    ];
  }

  static getRawTitolariRows(fileContent: string[][], rowIndexes: RowIndexes): string[][] {
    return fileContent.slice(rowIndexes.firstTitolareIndex, rowIndexes.lastTitolareIndex + 1);
  }

  static getRawPanchinariRows(fileContent: string[][], rowIndexes: RowIndexes) {
    return fileContent.slice(rowIndexes.firstPanchinaroIndex, rowIndexes.lastPanchinaroIndex + 1);
  }
}