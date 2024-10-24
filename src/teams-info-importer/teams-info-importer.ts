import { TeamInfo } from "../models/team-info.model";
import { TeamsInfoImporterI } from "./teams-info-importer.interface";

export class TeamsInfoImporter implements TeamsInfoImporterI {

  getTeamsInfo(): TeamInfo[] {
    return [];
  };
}