import { ModifierI, StaticModifier } from "../../../models/modifier.model";
import { TeamInfo } from "../../../models/team-info.model";
import { FormationAnalyzer } from "../formation-analyzer";
import { ModifierCaptain } from "./modifier-captain/modifier-captain";
import { ModifierDefense } from "./modifier-defense/modifier-defense";

export class ModifiersManager {

  public activeModifiers: (ModifierI | StaticModifier)[] = [];

  constructor(public teamInfo: TeamInfo) {
    this.activeModifiers = [
      new ModifierDefense(this.teamInfo),
      new ModifierCaptain(this.teamInfo),
    ];
  }

  public applyModifiers(formationAnalyzer: FormationAnalyzer): TeamCalculationEsit {
    let totalModifiers = 0;
    const detailModifiers: { id: string, teamId: string, points: number }[] = [];

    this.activeModifiers.forEach(modifier => {
      const result = modifier.calculate([formationAnalyzer]);
      if (result?.points) {
        // update total
        totalModifiers += result.points;

        // push detail 
        detailModifiers.push({
          id: modifier.id,
          teamId: result.teamId,
          points: result.points
        });
      }
    });
    return { totalModifiers, detailModifiers };
  }
}

export class TeamCalculationEsit {
  totalModifiers!: number;
  detailModifiers!: DetailModifier[];
}

export class DetailModifier {
  id!: string;
  teamId!: string;
  points!: number;
}