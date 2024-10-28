import { ModifierI } from "../../../../models/modifier.model";
import { PlayerInfoAVoto } from "../../../../models/player-info.model";
import { TeamInfo } from "../../../../models/team-info.model";
import { FormationAnalyzer } from "../../formation-analyzer";

export class ModifierCaptain implements ModifierI {

  id = 'captain';
  interestedPlayersA: PlayerInfoAVoto[];
  interestedPlayersB: PlayerInfoAVoto[];
  interestedRoles = ['P', 'D', 'C', 'A'] as ('P' | 'D' | 'C' | 'A')[];

  captainPoints?: number;

  constructor(public teamInfo: TeamInfo) {
    this.captainPoints = teamInfo.captainPoints;
    this.interestedPlayersA = [];
    this.interestedPlayersB = [];
  }

  public calculate(formationAnalyzers: FormationAnalyzer[]): { teamId: string, points: number } | null {
    // ritorna semplicemente il valore già calcolato ed inserito nell'excel
    const formationAnalyzer = formationAnalyzers[0];
    if (formationAnalyzer) {
      // do nothing, just for compilation
    }
    return { teamId: this.teamInfo.teamId, points: this.captainPoints ?? 0 };
  }
}
