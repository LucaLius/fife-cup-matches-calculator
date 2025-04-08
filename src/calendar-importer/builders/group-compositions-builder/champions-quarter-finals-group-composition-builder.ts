import { Group, GroupsComposition } from "../../calendar-importer.interface";
import { GroupCompositionBuilder } from "./group-composition-builder.interface";

export class ChampionsQuarterFinalsGroupCompositionBuilder implements GroupCompositionBuilder {
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
    groupA.teamIdA = 'ASTON BIRRA';
    groupA.teamIdB = 'MICCOLILLE';

    const groupB = new Group();
    groupB.idGroup = 'B';
    groupB.teamIdA = 'TEAM DADA';
    groupB.teamIdB = 'KANTÉ CABRIOLET';

    const groupC = new Group();
    groupC.idGroup = 'C';
    groupC.teamIdA = 'I RAGAZZI';
    groupC.teamIdB = 'AHI 3 CROCIATI';

    const groupD = new Group();
    groupD.idGroup = 'D';
    groupD.teamIdA = 'ACK BOMBA';
    groupD.teamIdB = 'REAL DUREZZA';

    return {
      A: groupA,
      B: groupB,
      C: groupC,
      D: groupD
    };
  }
}
