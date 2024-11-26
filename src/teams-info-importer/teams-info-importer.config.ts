// Used to collect the info about the input file structure

import { RowIndexes } from "../models/file-indexes.model";

export class TeamsInfoImporterConfig {

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