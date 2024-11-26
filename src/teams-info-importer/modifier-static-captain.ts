// for "Modificatore capitano" i keep the value present in input file

export class StaticModifierCaptain {

  private static readonly modifierId = 'Modificatore Capitano';

  static getPoints(fileContentRows: (string | number)[][], columnIndexes: { modifierIdIndex: number, modifierValueIndex: number }): number {

    const modifierCaptainRow = fileContentRows
      .find(row => row[columnIndexes.modifierIdIndex] === this.modifierId);

    if (modifierCaptainRow) {
      const cellValue = modifierCaptainRow[columnIndexes.modifierValueIndex];
      if (typeof cellValue === 'string') {
        return Number.parseInt(modifierCaptainRow[columnIndexes.modifierValueIndex] as string);
      }

      return modifierCaptainRow[columnIndexes.modifierValueIndex] as number;
    }

    return 0;
  }

}
