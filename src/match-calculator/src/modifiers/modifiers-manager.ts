import { ModifierI } from "../../../models/modifier.model";
import { PlayerInfoAVoto } from "../../../models/player-info.model";
import { TeamInfo } from "../../../models/team-info.model";
import { FormationAnalyzer } from "../formation-analyzer";
import { ModifierCaptain } from "./modifier-captain/modifier-captain";
import { ModifierDefense } from "./modifier-defense/modifier-defense";

export class ModifiersManager {

  public activeModifiers: ModifierI[] = [];

  constructor(public teamInfo: TeamInfo, allPlayers: PlayerInfoAVoto[]) {
    this.activeModifiers = [
      new ModifierDefense(this.teamInfo.teamId, allPlayers),
      new ModifierCaptain(this.teamInfo),
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