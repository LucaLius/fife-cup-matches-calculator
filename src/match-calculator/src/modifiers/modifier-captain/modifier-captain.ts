import { StaticModifier } from "../../../../models/modifier.model";
import { TeamInfo } from "../../../../models/team-info.model";

export class ModifierCaptain extends StaticModifier {

  id = 'captain';

  constructor(teamInfo: TeamInfo) {
    super(teamInfo, teamInfo.captainPoints);
  }
}
