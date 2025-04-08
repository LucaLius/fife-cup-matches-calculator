import { Group, GroupsComposition } from "../../calendar-importer.interface";
import { GroupCompositionBuilder } from "./group-composition-builder.interface";

export class EuropeLastSixteensGroupCompositionBuilder implements GroupCompositionBuilder {
  // Essendo ottavi di finale, potenzialmente sono tutti istanze diverse di GroupCompositionBuilder)
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
    groupA.teamIdA = 'FC DIREZIONE';
    groupA.teamIdB = 'CHIAVOVERONICA';

    const groupB = new Group();
    groupB.idGroup = 'B';
    groupB.teamIdA = 'REDBLACK';
    groupB.teamIdB = 'FC PUSSY MIX';

    const groupC = new Group();
    groupC.idGroup = 'C';
    groupC.teamIdA = 'NAPOLETHANOS';
    groupC.teamIdB = 'BORGO GRAZZANO';

    const groupD = new Group();
    groupD.idGroup = 'D';
    groupD.teamIdA = 'CCORYO JUNIORS';
    groupD.teamIdB = 'BEN FICA';

    const groupE = new Group();
    groupE.idGroup = 'E';
    groupE.teamIdA = 'REAL MAKADAM';
    groupE.teamIdB = 'VILLA FRIGNAVERA';

    const groupF = new Group();
    groupF.idGroup = 'F';
    groupF.teamIdA = 'IRON GAS';
    groupF.teamIdB = 'CSKA PIAVON';

    const groupG = new Group();
    groupG.idGroup = 'G';
    groupG.teamIdA = 'SMOKING BIANCO.';
    groupG.teamIdB = 'STARK INDUSTRIES';

    const groupH = new Group();
    groupH.idGroup = 'H';
    groupH.teamIdA = 'DINAMO KEYV';
    groupH.teamIdB = 'MANCHESTER SINTY';

    return {
      A: groupA,
      B: groupB,
      C: groupC,
      D: groupD,
      E: groupE,
      F: groupF,
      G: groupG,
      H: groupH
    };
  }
}
