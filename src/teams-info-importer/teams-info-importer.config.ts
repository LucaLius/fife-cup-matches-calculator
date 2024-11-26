// Used to collect the info about the input file structure

export class TeamsInfoImporterConfig {

  static matchInfoIndexesCalculator(startingIndex: number) {
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