import { getGroupStageGroups } from "../../../config/group-stage-group-list.config";
import { Team } from "../../../config/team-list.config";
import { Group, GroupsComposition } from "../../calendar-importer.interface";
import { GroupCompositionBuilder } from "./group-composition-builder.interface";

export class GroupCompositionGroupStageBuilder implements GroupCompositionBuilder {

  public groupsComposition: GroupsComposition;

  constructor() {
    const groups = getGroupStageGroups();
    this.groupsComposition = this.initGroups(groups);
  }

  public getGroupsComposition(): GroupsComposition {
    return this.groupsComposition;
  }

  private initGroups(groups: { id: string, teams: Team[] }[]): GroupsComposition {

    const result = {} as any;
    groups.forEach(group => {
      const groupIstance = new Group();
      groupIstance.idGroup = group.id;
      groupIstance.teamIdA = group.teams[0];
      groupIstance.teamIdB = group.teams[1];
      groupIstance.teamIdC = group.teams[2];
      groupIstance.teamIdD = group.teams[3];
      result[group.id] = groupIstance;
    });


    return result;
  }
}
