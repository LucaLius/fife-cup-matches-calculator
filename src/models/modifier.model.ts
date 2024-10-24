import { FormationAnalyzer } from "../match-calculator/src/formation-analyzer";
import { PlayerInfo } from "./player-info.model";

export interface ModifierI {
  id: string;
  interestedPlayers: PlayerInfo[];
  interestedRoles: ('P' | 'D' | 'C' | 'A')[];

  calculate(formationAnalyzer: FormationAnalyzer): number | null;
}