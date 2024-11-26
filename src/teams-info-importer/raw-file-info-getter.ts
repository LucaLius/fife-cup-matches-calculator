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
      ...this.getRawTitolari(fileContent, rowIndexes),
      ...this.getRawPanchinari(fileContent, rowIndexes)
    ];
  }

  static getRawTitolari(fileContent: string[][], rowIndexes: RowIndexes): string[][] {
    return fileContent.slice(rowIndexes.firstTitolareIndex, rowIndexes.lastTitolareIndex + 1);
  }

  static getRawPanchinari(fileContent: string[][], rowIndexes: RowIndexes) {
    return fileContent.slice(rowIndexes.firstPanchinaroIndex, rowIndexes.lastPanchinaroIndex + 1);
  }
}