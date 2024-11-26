import { StaticModifier } from "../../../../models/modifier.model";
import { TeamInfo } from "../../../../models/team-info.model";

export class ModifierDefense extends StaticModifier {

  id = 'defense';

  constructor(teamInfo: TeamInfo) {
    super(teamInfo, teamInfo.defensePoints);
  }
}