import { FormationAnalyzer } from "../match-calculator/src/formation-analyzer";
import { PlayerInfo } from "./player-info.model";

export interface ModifierI {
  id: string;
  interestedPlayersA: PlayerInfo[];
  interestedPlayersB: PlayerInfo[];
  interestedRoles: ('P' | 'D' | 'C' | 'A')[];

  calculate(formationAnalyzers: FormationAnalyzer[]): { teamId: string, points: number } | null;
}