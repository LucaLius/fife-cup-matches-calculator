import { Group, GroupsComposition } from "../../calendar-importer.interface";
import { GroupCompositionBuilder } from "./group-composition-builder.interface";

export class EuropeQuarterFinalsGroupCompositionBuilder implements GroupCompositionBuilder {
  // Essendo quarti di finale, potenzialmente sono tutti istanze diverse di GroupCompositionBuilder)
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
    groupA.idGroup = 'A';
    groupA.teamIdA = 'CHIAVOVERONICA';
    groupA.teamIdB = 'FC PUSSY MIX';

    const groupB = new Group();
    groupB.idGroup = 'B';
    groupB.teamIdA = 'BORGO GRAZZANO';
    groupB.teamIdB = 'CCORYO JUNIORS';

    const groupC = new Group();
    groupC.idGroup = 'C';
    groupC.teamIdA = 'VILLA FRIGNAVERA';
    groupC.teamIdB = 'IRON GAS';

    const groupD = new Group();
    groupD.idGroup = 'D';
    groupD.teamIdA = 'SMOKING BIANCO.';
    groupD.teamIdB = 'DINAMO KEYV';

    return {
      A: groupA,
      B: groupB,
      C: groupC,
      D: groupD
    };
  }
}
