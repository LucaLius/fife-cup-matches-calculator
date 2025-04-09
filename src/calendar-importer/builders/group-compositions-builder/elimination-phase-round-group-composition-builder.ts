import { Team } from "../../../config/team-list.config";
import { Group, GroupsComposition } from "../../calendar-importer.interface";
import { GroupCompositionBuilder } from "./group-composition-builder.interface";

export class EliminationPhaseRoundGroupCompositionBuilder implements GroupCompositionBuilder {

  public groupsComposition: GroupsComposition;

  constructor(groups: { id: string, teams: Team[] }[]) {
    this.groupsComposition = this.initGroups(groups);
  }

  public getGroupsComposition(): GroupsComposition {
    return this.groupsComposition;
  }

  // Ogni Group è un accoppiamento tra due squadre
  private initGroups(groups: { id: string, teams: Team[] }[]): GroupsComposition {

    const result = {} as { [groupId: string]: Group };
    groups.forEach(group => {
      const groupIstance = new Group();
      groupIstance.idGroup = group.id;
      groupIstance.teamIdA = group.teams[0];
      groupIstance.teamIdB = group.teams[1];
      result[group.id] = groupIstance;
    });

    return result;
  }
}
