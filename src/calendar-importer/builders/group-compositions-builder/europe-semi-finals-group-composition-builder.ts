import { Group, GroupsComposition } from "../../calendar-importer.interface";
import { GroupCompositionBuilder } from "./group-composition-builder.interface";

export class EuropeSemiFinalsGroupCompositionBuilder implements GroupCompositionBuilder {
  // Essendo semifinali, potenzialmente sono tutti istanze diverse di GroupCompositionBuilder)
  // TODO: capire come gestire ottavi, quarti, etc senza creare altre classi
  // TODO: capire come gestire competizioni diverse

  public groupsComposition: GroupsComposition;

  constructor() {
    this.groupsComposition = this.initGroups();
  }

  public getGroupsComposition(): GroupsComposition {
    return this.groupsComposition;
  }

  // Ogni Group è un accoppiamento tra due squadre
  private initGroups(): GroupsComposition {
    const groupA = new Group();
    groupA.idGroup = 1;
    groupA.teamIdA = 'CHIAVOVERONICA';
    groupA.teamIdB = 'CCORYO JUNIORS';

    const groupB = new Group();
    groupB.idGroup = 2;
    groupB.teamIdA = 'VILLA FRIGNAVERA';
    groupB.teamIdB = 'DINAMO KEYV';

    return {
      A: groupA,
      B: groupB
    };
  }
}
