import { ModifierI } from "../../../models/modifier.model";
import { PlayerInfoAVoto } from "../../../models/player-info.model";
import { FormationAnalyzer } from "../formation-analyzer";
import { ModifierDefense } from "./modifier-defense/modifier-defense";

export class ModifiersManager {

  public activeModifiers: ModifierI[] = [];

  constructor(public teamId: string, allPlayers: PlayerInfoAVoto[]) {
    this.activeModifiers = [
      new ModifierDefense(this.teamId, allPlayers)
    ];
  }

  public applyModifiers(formationAnalyzer: FormationAnalyzer): number {
    let totalModifiers = 0;
    this.activeModifiers.forEach(modifier => {
      const result = modifier.calculate([formationAnalyzer]);
      if (result?.points) {
        totalModifiers += result.points;
      }
    });

    return totalModifiers;
  }
}