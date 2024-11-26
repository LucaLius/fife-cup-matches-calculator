import { FormationAnalyzer } from "../match-calculator/src/formation-analyzer";
import { PlayerInfo } from "./player-info.model";
import { TeamInfo } from "./team-info.model";

export interface ModifierI {
  id: string;
  interestedPlayersA: PlayerInfo[];
  interestedPlayersB: PlayerInfo[];
  interestedRoles: ('P' | 'D' | 'C' | 'A')[];

  calculate(formationAnalyzers: FormationAnalyzer[]): { teamId: string, points: number } | null;
}

export abstract class StaticModifier {

  abstract id: string;

  private teamInfo: TeamInfo;
  private points?: number;

  constructor(teamInfo: TeamInfo, points?: number) {
    this.points = points;
    this.teamInfo = teamInfo;
  }

  public calculate(): { teamId: string, points: number } {
    // ritorna semplicemente il valore già calcolato ed inserito nell'excel
    return { teamId: this.teamInfo.teamId, points: this.points ?? 0 };
  }
}