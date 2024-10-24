import { PlayerInfo } from "./player-info.model";

export interface TeamInfo {
  teamId: string;
  formation: '4-4-2' | '3-4-3',
  allPlayersByRole: {
    P: PlayerInfo[] // Goalkeepers
    D: PlayerInfo[] // Defender
    C: PlayerInfo[] // Midfielders
    A: PlayerInfo[] // Strikers
  };
}