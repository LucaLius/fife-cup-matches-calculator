import { CalendarMatch } from "../models/calendar-match.model";
import { MatchDayCombinationsBuilder } from "./builders/match-day-combinations-builder.interface";
import { CalendarImporterI, Combination, Group, GroupsComposition, MatchDayCombinations } from "./calendar-importer.interface";

export class CalendarImporter implements CalendarImporterI {

  groupsComposition: GroupsComposition;
  matchDayCombinations: MatchDayCombinations;

  constructor(public matchDayCombinationsBuilder: MatchDayCombinationsBuilder) {
    this.groupsComposition = this.initGroups();
    this.matchDayCombinations = matchDayCombinationsBuilder.getMatchDayCombinations();
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
