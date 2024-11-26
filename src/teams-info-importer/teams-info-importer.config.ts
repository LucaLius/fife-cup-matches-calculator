// Used to collect the info about the input file structure

import { RowIndexes } from "../models/file-indexes.model";

export class TeamsInfoImporterConfig {

  static matchInfoIndexesCalculator(startingIndex: number): RowIndexes {
    return {
      generalInfoIndex: startingIndex,
      formationsIndex: startingIndex + 1,
      firstTitolareIndex: startingIndex + 2,
      lastTitolareIndex: startingIndex + 12,
      firstPanchinaroIndex: startingIndex + 14,
      lastPanchinaroIndex: startingIndex + 21
    }
  }
}