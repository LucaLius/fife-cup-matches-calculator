import { PlayerInfo } from "./player-info.model";

export interface TeamInfo {
  teamId: string;
  formation: '4-4-2' | '3-4-3' | '4-5-1',
  captainPoints?: number;
  allPlayersByRole: {
    P: PlayerInfo[] // Goalkeepers
    D: PlayerInfo[] // Defender
    C: PlayerInfo[] // Midfielders
    A: PlayerInfo[] // Strikers
  };
  rawTitolari?: string[][];
  rawPanchinari?: string[][];
}