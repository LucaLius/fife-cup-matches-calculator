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
    groupA.idGroup = 1;
    groupA.teamIdA = 'FC DIREZIONE';
    groupA.teamIdB = 'CHIAVOVERONICA';

    const groupB = new Group();
    groupB.idGroup = 2;
    groupB.teamIdA = 'REDBLACK';
    groupB.teamIdB = 'FC PUSSY MIX';

    const groupC = new Group();
    groupC.idGroup = 3;
    groupC.teamIdA = 'NAPOLETHANOS';
    groupC.teamIdB = 'BORGO GRAZZANO';

    const groupD = new Group();
    groupD.idGroup = 4;
    groupD.teamIdA = 'CCORYO JUNIORS';
    groupD.teamIdB = 'BEN FICA';

    const groupE = new Group();
    groupE.idGroup = 5;
    groupE.teamIdA = 'REAL MAKADAM';
    groupE.teamIdB = 'VILLA FRIGNAVERA';

    const groupF = new Group();
    groupF.idGroup = 6;
    groupF.teamIdA = 'IRON GAS';
    groupF.teamIdB = 'CSKA PIAVON';

    const groupG = new Group();
    groupG.idGroup = 7;
    groupG.teamIdA = 'SMOKING BIANCO.';
    groupG.teamIdB = 'STARK INDUSTRIES';

    const groupH = new Group();
    groupH.idGroup = 8;
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
