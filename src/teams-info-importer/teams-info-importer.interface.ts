import { TeamInfo } from "../models/team-info.model";

export interface TeamsInfoImporterI {

  getTeamsInfo(files: Express.Multer.File[]): { serieAMatchNumber: string, teamsInfo: TeamInfo[] };

} 