import { PlayerInfo } from "./player-info.model";

export interface TeamInfo {
  teamId: string;
  formation: string,
  captainPoints?: number;
  allPlayersByRole: {
    P: PlayerInfo[] // Goalkeepers
    D: PlayerInfo[] // Defender
    C: PlayerInfo[] // Midfielders
    A: PlayerInfo[] // Strikers
  };
  rawTitolari?: (string | number)[][];
  rawPanchinari?: (string | number)[][];
}