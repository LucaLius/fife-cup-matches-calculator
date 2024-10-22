import { PlayerInfo } from "./player-info.model";

export interface TeamInfo {
  teamId: string;
  formation: '3-4-3',
  allPlayersByRole: {
    P: PlayerInfo[] // Goalkeepers
    D: PlayerInfo[] // Defender
    C: PlayerInfo[] // Midfielders
    A: PlayerInfo[] // Strikers
  };
}