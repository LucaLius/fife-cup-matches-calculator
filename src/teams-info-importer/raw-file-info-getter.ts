// Used to get portions of the raw data 

import { ColumnIndexes } from "../models/column-indexes.model";

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
}