// for "Modificatore capitano" i keep the value present in input file

export class StaticModifierCaptain {

  private static readonly modifierId = 'Modificatore Capitano';

  static getPoints(fileContentRows: string[][], columnIndexes: { modifierIdIndex: number, modifierValueIndex: number }): number {

    const modifierCaptainRow = fileContentRows
      .find(row => row[columnIndexes.modifierIdIndex] === this.modifierId);

    if (modifierCaptainRow) {
      return Number.parseInt(modifierCaptainRow[columnIndexes.modifierValueIndex]);
    }

    return 0;
  }

}
