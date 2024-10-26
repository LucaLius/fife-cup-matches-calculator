import { ModifierI } from "../../../models/modifier.model";
import { PlayerInfoAVoto } from "../../../models/player-info.model";
import { FormationAnalyzer } from "../formation-analyzer";
import { ModifierDefense } from "./modifier-defense/modifier-defense";

export class ModifiersManager {

  public activeModifiers: ModifierI[] = [];

  constructor(allPlayers: PlayerInfoAVoto[]) {
    this.activeModifiers = [
      new ModifierDefense(allPlayers)
    ];
  }

  public applyModifiers(formationAnalyzer: FormationAnalyzer): number {
    let totalModifiers = 0;
    this.activeModifiers.forEach(modifier => {
      const value = modifier.calculate(formationAnalyzer);
      if (value !== null) {
        totalModifiers += value;
      }
    });

    return totalModifiers;
  }
}