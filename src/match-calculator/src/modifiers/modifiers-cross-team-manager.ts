import { ModifierI } from "../../../models/modifier.model";
import { PlayerInfoAVoto } from "../../../models/player-info.model";
import { FormationAnalyzer } from "../formation-analyzer";
import { ModifierMidfield } from "./modifier-midfield/modifier-midfield";

export class ModifiersCrossTeamsManager {

  public activeModifiers: ModifierI[] = [];

  constructor(public homeTeamId: string, public awayTeamId: string, allElevenPlayersA: PlayerInfoAVoto[], allElevenPlayersB: PlayerInfoAVoto[]) {
    this.activeModifiers = [
      new ModifierMidfield(this.homeTeamId, this.awayTeamId, allElevenPlayersA, allElevenPlayersB)
    ];
  }

  public applyModifiers(homeTeamId: string, awayTeamId: string, homeFormationAnalyzer: FormationAnalyzer, awayFormationAnalyzer: FormationAnalyzer): CrossTeamCalculationEsit {
    const totalModifiers = [
      { teamId: homeTeamId, points: 0 },
      { teamId: awayTeamId, points: 0 },
    ];
    const detailModifiers: { id: string, teamId: string, points: number }[] = [];
    this.activeModifiers.forEach(modifier => {
      const result = modifier.calculate([homeFormationAnalyzer, awayFormationAnalyzer]);
      if (result?.points) {
        // push detail 
        detailModifiers.push({
          id: modifier.id,
          teamId: result.teamId,
          points: result.points
        })
        // update total
        const target = totalModifiers.find(el => el.teamId === result.teamId);
        if (target) {
          target.points += result.points;
        }
      }
    });

    return { totalModifiers, detailModifiers };
  }
}

export class CrossTeamCalculationEsit {
  totalModifiers!: { teamId: string, points: number }[];
  detailModifiers!: { id: string, teamId: string, points: number }[];
}