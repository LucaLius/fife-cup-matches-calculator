// Used to collect the info about the input file structure

import { ColumnIndexes, RowIndexes } from "../models/file-indexes.model";

export class TeamsInfoImporterConfig {

  static readonly MATCHES_PER_FILE = 4;

  static readonly COLUMNS_INDEXES_SETTINGS = {
    teamOne: {
      nameIndex: 0,
      formationIndex: 0,
      rolePlayerIndex: 0,
      modifierIdIndex: 0,
      namePlayerIndex: 1,
      serieATeamInex: 2,
      votePlayerIndex: 3,
      fantasyVotePlayerIndex: 4,
      modifierValueIndex: 4
    } as ColumnIndexes,
    teamTwo: {
      nameIndex: 6,
      formationIndex: 6,
      rolePlayerIndex: 6,
      modifierIdIndex: 6,
      namePlayerIndex: 7,
      serieATeamInex: 8,
      votePlayerIndex: 9,
      fantasyVotePlayerIndex: 10,
      modifierValueIndex: 10
    } as ColumnIndexes
  };

  static matchInfoIndexesCalculator(): RowIndexes {
    return {
      generalInfoIndex: 0,
      formationsIndex: 1,
      firstTitolareIndex: 2,
      lastTitolareIndex: 12,
      firstPanchinaroIndex: 14,
      lastPanchinaroIndex: 21
    }
  }
}