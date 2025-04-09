import { getChampionsLeagueLastSixteensRoundGroups } from "../../../config/champions-league-round-list.config";
import { Team } from "../../../config/team-list.config";
import { Group, GroupsComposition } from "../../calendar-importer.interface";
import { GroupCompositionBuilder } from "./group-composition-builder.interface";

export class ChampionsLastSixteensGroupCompositionBuilder implements GroupCompositionBuilder {
  // Essendo ottavi di finale, potenzialmente sono tutti istanze diverse di GroupCompositionBuilder)
  // TODO: capire come gestire ottavi, quarti, etc senza creare altre classi
  // TODO: capire come gestire competizioni diverse

  public groupsComposition: GroupsComposition;

  constructor() {
    const groups = getChampionsLeagueLastSixteensRoundGroups();
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
