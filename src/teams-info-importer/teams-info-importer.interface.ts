import { TeamInfo } from "../models/team-info.model";

export interface TeamsInfoImporterI {

  getTeamsInfo(): { serieAMatchNumber: string, teamsInfo: TeamInfo[] };

} 