import { StaticModifier } from "../../../../models/modifier.model";
import { TeamInfo } from "../../../../models/team-info.model";

export class ModifierOfficePlayers extends StaticModifier {

  id = 'office_players';

  constructor(teamInfo: TeamInfo) {
    super(teamInfo, teamInfo.officePlayersPoints);

    this.excludeFromTotal = true;
  }
}
