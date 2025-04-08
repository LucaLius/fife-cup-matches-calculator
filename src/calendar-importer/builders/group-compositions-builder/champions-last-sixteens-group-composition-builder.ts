import { Group, GroupsComposition } from "../../calendar-importer.interface";
import { GroupCompositionBuilder } from "./group-composition-builder.interface";

export class ChampionsLastSixteensGroupCompositionBuilder implements GroupCompositionBuilder {
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
    groupA.teamIdA = 'NOT ATHLETIC CRODANZO';
    groupA.teamIdB = 'ASTON BIRRA';

    const groupB = new Group();
    groupB.idGroup = 'B';
    groupB.teamIdA = 'MICCOLILLE';
    groupB.teamIdB = 'DALLAS';

    const groupC = new Group();
    groupC.idGroup = 'C';
    groupC.teamIdA = 'TEAM DADA';
    groupC.teamIdB = 'NEROAZZURRI';

    const groupD = new Group();
    groupD.idGroup = 'D';
    groupD.teamIdA = 'KANTÉ CABRIOLET';
    groupD.teamIdB = 'COCABRODA';

    const groupE = new Group();
    groupE.idGroup = 'E';
    groupE.teamIdA = 'I RAGAZZI';
    groupE.teamIdB = 'REAL GRIFONE';

    const groupF = new Group();
    groupF.idGroup = 'F';
    groupF.teamIdA = 'RIVER BOLUDOS';
    groupF.teamIdB = 'AHI 3 CROCIATI';

    const groupG = new Group();
    groupG.idGroup = 'G';
    groupG.teamIdA = 'BAYERN LEVERDUREN.';
    groupG.teamIdB = 'ACK BOMBA';

    const groupH = new Group();
    groupH.idGroup = 'H';
    groupH.teamIdA = 'REAL DUREZZA';
    groupH.teamIdB = 'LOS ANGELO - UN ESPERTO';

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
