// for "Modificatore difesa" I keep the value present in input file

import { StaticModifier } from "./modifier-static";

export class StaticModifierDefense extends StaticModifier {

  readonly modifierId = 'Modificatore difesa';

  constructor() {
    super();
  }

}
