import { CalendarMatch } from "../models/calendar-match.model";
import { CalendarImporterI, Combination, Group, GroupsComposition, MatchDayCombinations } from "./calendar-importer.interface";

export class CalendarImporter implements CalendarImporterI {

  groupsComposition: GroupsComposition;

  matchDayCombinations: MatchDayCombinations = {
    1: combinationsMatchDayOne,
  };

  constructor() {
    this.groupsComposition = this.initGroups();
  }

  getCalendarMatches(matchNumber: number): CalendarMatch[] {
    const calendarImporter = new CalendarImporter();

    return {
      '1': calendarImporter.getMatchDayMatches(1),
      '2': match_number_2_matches,
      '3': match_number_3_matches,
      '4': match_number_4_matches,
    }[matchNumber] || [];
  }

  getMatchDayMatches(matchDay: number): CalendarMatch[] {
    const result: CalendarMatch[] = [];

    let progressiveMatchId = 1;
    const combinations = this.matchDayCombinations[matchDay];
    const groupKeys = Object.keys(this.groupsComposition);
    groupKeys.forEach(groupKey => {
      combinations.forEach(combination => {
        const group = this.groupsComposition[groupKey];
        const matchDayMatch = this.getMatchDayMatch(matchDay, group, combination, progressiveMatchId);
        progressiveMatchId++;
        result.push(matchDayMatch);
      });
    });

    return result;
  }


  getMatchDayMatch(matchDay: number, group: Group, combination: Combination, progressiveMatchId: number): CalendarMatch {
    const homeId = group.getTeamIdFromOriginGroup(combination.homeTeamGroup);
    const awayId = group.getTeamIdFromOriginGroup(combination.awayTeamGroup);
    return {
      id: progressiveMatchId,
      idGroup: group.idGroup,
      matchNumber: matchDay,
      homeId,
      awayId
    };
  }

  initGroups(): GroupsComposition {
    const groupA = new Group();
    groupA.idGroup = 1;
    groupA.teamIdA = 'SMOKING BIANCO.';
    groupA.teamIdB = 'REAL DUREZZA';
    groupA.teamIdC = 'BORGO GRAZZANO';
    groupA.teamIdD = 'ASTON BIRRA';

    const groupB = new Group();
    groupB.idGroup = 2;
    groupB.teamIdA = 'NEROAZZURRI';
    groupB.teamIdB = 'RIVER BOLUDOS';
    groupB.teamIdC = 'REDBLACK';
    groupB.teamIdD = 'FC PUSSY MIX';

    const groupC = new Group();
    groupC.idGroup = 3;
    groupC.teamIdA = 'IRON GAS';
    groupC.teamIdB = 'AHI 3 CROCIATI';
    groupC.teamIdC = 'STARK INDUSTRIES';
    groupC.teamIdD = 'NOT ATHLETIC CRODANZO';

    const groupD = new Group();
    groupD.idGroup = 4;
    groupD.teamIdA = 'MANCHESTER SINTY';
    groupD.teamIdB = 'COCABRODA';
    groupD.teamIdC = 'TEAM DADA';
    groupD.teamIdD = 'REAL MAKADAM';

    const groupE = new Group();
    groupE.idGroup = 5;
    groupE.teamIdA = 'NAPOLETHANOS';
    groupE.teamIdB = 'BEN FICA';
    groupE.teamIdC = 'LOS ANGELO - UN ESPERTO';
    groupE.teamIdD = 'KANTÉ CABRIOLET';

    const groupF = new Group();
    groupF.idGroup = 6;
    groupF.teamIdA = 'BAYERN LEVERDUREN.';
    groupF.teamIdB = 'CHIAVOVERONICA';
    groupF.teamIdC = 'FC DIREZIONE';
    groupF.teamIdD = 'DALLAS';

    const groupG = new Group();
    groupG.idGroup = 7;
    groupG.teamIdA = 'REAL GRIFONE';
    groupG.teamIdB = 'DINAMO KEYV';
    groupG.teamIdC = 'MICCOLILLE';
    groupG.teamIdD = 'CSKA PIAVON';

    const groupH = new Group();
    groupH.idGroup = 8;
    groupH.teamIdA = 'I RAGAZZI';
    groupH.teamIdB = 'CCORYO JUNIORS';
    groupH.teamIdC = 'VILLA FRIGNAVERA';
    groupH.teamIdD = 'ACK BOMBA';

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



const combinationsMatchDayOne = [
  {
    homeTeamGroup: 'A',
    awayTeamGroup: 'B',
  },
  {
    homeTeamGroup: 'C',
    awayTeamGroup: 'D',
  }
];


const match_number_2_matches: CalendarMatch[] = [
  {
    id: 1,
    idGroup: 1, // Girone A,
    matchNumber: 2,
    homeId: 'SMOKING BIANCO.',
    awayId: 'BORGO GRAZZANO'
  },
  {
    id: 2,
    idGroup: 1, // Girone A
    matchNumber: 2,
    homeId: 'REAL DUREZZA',
    awayId: 'ASTON BIRRA'
  },
  {
    id: 3,
    idGroup: 2, // Girone B
    matchNumber: 2,
    homeId: 'NEROAZZURRI',
    awayId: 'REDBLACK'
  },
  {
    id: 4,
    idGroup: 2, // Girone B
    matchNumber: 2,
    homeId: 'RIVER BOLUDOS',
    awayId: 'FC PUSSY MIX'
  },
  {
    id: 5,
    idGroup: 3, // Girone C
    matchNumber: 2,
    homeId: 'IRON GAS',
    awayId: 'STARK INDUSTRIES'
  },
  {
    id: 6,
    idGroup: 3, // Girone C
    matchNumber: 2,
    homeId: 'AHI 3 CROCIATI',
    awayId: 'NOT ATHLETIC CRODANZO'
  },
  {
    id: 7,
    idGroup: 4, // Girone D
    matchNumber: 2,
    homeId: 'MANCHESTER SINTY',
    awayId: 'TEAM DADA'
  },
  {
    id: 8,
    idGroup: 4, // Girone D
    matchNumber: 2,
    homeId: 'COCABRODA',
    awayId: 'REAL MAKADAM'
  },
  {
    id: 9,
    idGroup: 5, // Girone E
    matchNumber: 2,
    homeId: 'NAPOLETHANOS',
    awayId: 'LOS ANGELO - UN ESPERTO'
  },
  {
    id: 10,
    idGroup: 5, // Girone E
    matchNumber: 2,
    homeId: 'BEN FICA',
    awayId: 'KANTÉ CABRIOLET'
  },
  {
    id: 11,
    idGroup: 6, // Girone F
    matchNumber: 2,
    homeId: 'BAYERN LEVERDUREN.',
    awayId: 'FC DIREZIONE'
  },
  {
    id: 12,
    idGroup: 6, // Girone F
    matchNumber: 2,
    homeId: 'CHIAVOVERONICA',
    awayId: 'DALLAS'
  },
  {
    id: 13,
    idGroup: 7, // Girone G
    matchNumber: 2,
    homeId: 'REAL GRIFONE',
    awayId: 'MICCOLILLE'
  },
  {
    id: 14,
    idGroup: 7, // Girone G
    matchNumber: 2,
    homeId: 'DINAMO KEYV',
    awayId: 'CSKA PIAVON'
  },
  {
    id: 15,
    idGroup: 8, // Girone H
    matchNumber: 2,
    homeId: 'I RAGAZZI',
    awayId: 'VILLA FRIGNAVERA'
  },
  {
    id: 16,
    idGroup: 8, // Girone H
    matchNumber: 2,
    homeId: 'CCORYO JUNIORS',
    awayId: 'ACK BOMBA'
  },
];

const match_number_3_matches: CalendarMatch[] = [
  {
    id: 1,
    idGroup: 1, // Girone A,
    matchNumber: 3,
    homeId: 'SMOKING BIANCO.',
    awayId: 'ASTON BIRRA'
  },
  {
    id: 2,
    idGroup: 1, // Girone A
    matchNumber: 3,
    homeId: 'BORGO GRAZZANO',
    awayId: 'REAL DUREZZA'
  },
  {
    id: 3,
    idGroup: 2, // Girone B
    matchNumber: 3,
    homeId: 'NEROAZZURRI',
    awayId: 'FC PUSSY MIX'
  },
  {
    id: 4,
    idGroup: 2, // Girone B
    matchNumber: 3,
    homeId: 'REDBLACK',
    awayId: 'RIVER BOLUDOS'
  },
  {
    id: 5,
    idGroup: 3, // Girone C
    matchNumber: 3,
    homeId: 'IRON GAS',
    awayId: 'NOT ATHLETIC CRODANZO'
  },
  {
    id: 6,
    idGroup: 3, // Girone C
    matchNumber: 3,
    homeId: 'STARK INDUSTRIES',
    awayId: 'AHI 3 CROCIATI',
  },
  {
    id: 7,
    idGroup: 4, // Girone D
    matchNumber: 3,
    homeId: 'MANCHESTER SINTY',
    awayId: 'REAL MAKADAM'
  },
  {
    id: 8,
    idGroup: 4, // Girone D
    matchNumber: 3,
    homeId: 'TEAM DADA',
    awayId: 'COCABRODA'
  },
  {
    id: 9,
    idGroup: 5, // Girone E
    matchNumber: 3,
    homeId: 'NAPOLETHANOS',
    awayId: 'KANTÉ CABRIOLET'
  },
  {
    id: 10,
    idGroup: 5, // Girone E
    matchNumber: 3,
    homeId: 'LOS ANGELO - UN ESPERTO',
    awayId: 'BEN FICA'
  },
  {
    id: 11,
    idGroup: 6, // Girone F
    matchNumber: 3,
    homeId: 'BAYERN LEVERDUREN.',
    awayId: 'DALLAS'
  },
  {
    id: 12,
    idGroup: 6, // Girone F
    matchNumber: 3,
    homeId: 'FC DIREZIONE',
    awayId: 'CHIAVOVERONICA'
  },
  {
    id: 13,
    idGroup: 7, // Girone G
    matchNumber: 3,
    homeId: 'REAL GRIFONE',
    awayId: 'CSKA PIAVON'
  },
  {
    id: 14,
    idGroup: 7, // Girone G
    matchNumber: 3,
    homeId: 'MICCOLILLE',
    awayId: 'DINAMO KEYV'
  },
  {
    id: 15,
    idGroup: 8, // Girone H
    matchNumber: 3,
    homeId: 'I RAGAZZI',
    awayId: 'ACK BOMBA'
  },
  {
    id: 16,
    idGroup: 8, // Girone H
    matchNumber: 3,
    homeId: 'VILLA FRIGNAVERA',
    awayId: 'CCORYO JUNIORS'
  },
];

const match_number_4_matches: CalendarMatch[] = [
  {
    id: 1,
    idGroup: 1, // Girone A,
    matchNumber: 4,
    homeId: 'SMOKING BIANCO.',
    awayId: 'REAL DUREZZA'
  },
  {
    id: 2,
    idGroup: 1, // Girone A
    matchNumber: 4,
    homeId: 'BORGO GRAZZANO',
    awayId: 'ASTON BIRRA'
  },
  {
    id: 3,
    idGroup: 2, // Girone B
    matchNumber: 4,
    homeId: 'NEROAZZURRI',
    awayId: 'RIVER BOLUDOS'
  },
  {
    id: 4,
    idGroup: 2, // Girone B
    matchNumber: 4,
    homeId: 'REDBLACK',
    awayId: 'FC PUSSY MIX'
  },
  {
    id: 5,
    idGroup: 3, // Girone C
    matchNumber: 4,
    homeId: 'IRON GAS',
    awayId: 'AHI 3 CROCIATI'
  },
  {
    id: 6,
    idGroup: 3, // Girone C
    matchNumber: 4,
    homeId: 'STARK INDUSTRIES',
    awayId: 'NOT ATHLETIC CRODANZO'
  },
  {
    id: 7,
    idGroup: 4, // Girone D
    matchNumber: 4,
    homeId: 'MANCHESTER SINTY',
    awayId: 'COCABRODA'
  },
  {
    id: 8,
    idGroup: 4, // Girone D
    matchNumber: 4,
    homeId: 'TEAM DADA',
    awayId: 'REAL MAKADAM'
  },
  {
    id: 9,
    idGroup: 5, // Girone E
    matchNumber: 4,
    homeId: 'NAPOLETHANOS',
    awayId: 'BEN FICA'
  },
  {
    id: 10,
    idGroup: 5, // Girone E
    matchNumber: 4,
    homeId: 'LOS ANGELO - UN ESPERTO',
    awayId: 'KANTÉ CABRIOLET'
  },
  {
    id: 11,
    idGroup: 6, // Girone F
    matchNumber: 4,
    homeId: 'BAYERN LEVERDUREN.',
    awayId: 'CHIAVOVERONICA'
  },
  {
    id: 12,
    idGroup: 6, // Girone F
    matchNumber: 4,
    homeId: 'FC DIREZIONE',
    awayId: 'DALLAS'
  },
  {
    id: 13,
    idGroup: 7, // Girone G
    matchNumber: 4,
    homeId: 'REAL GRIFONE',
    awayId: 'DINAMO KEYV'
  },
  {
    id: 14,
    idGroup: 7, // Girone G
    matchNumber: 4,
    homeId: 'MICCOLILLE',
    awayId: 'CSKA PIAVON'
  },
  {
    id: 15,
    idGroup: 8, // Girone H
    matchNumber: 4,
    homeId: 'I RAGAZZI',
    awayId: 'CCORYO JUNIORS'
  },
  {
    id: 16,
    idGroup: 8, // Girone H
    matchNumber: 4,
    homeId: 'VILLA FRIGNAVERA',
    awayId: 'ACK BOMBA'
  },
];