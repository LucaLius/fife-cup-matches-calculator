// for a modifier that can keep the value present in input file

export abstract class StaticModifier {

  abstract readonly modifierId: string;

  getPoints(matchFileRows: (string | number)[][], columnIndexes: { modifierIdIndex: number, modifierValueIndex: number }): number {

    const modifierCaptainRow = matchFileRows
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