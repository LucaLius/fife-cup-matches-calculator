import { GroupCompositionBuilder } from './builders/group-composition.builder';
import { CalendarMatch } from "../models/calendar-match.model";
import { MatchDayCombinationsBuilder } from "./builders/match-day-combinations-builder.interface";
import { CalendarImporterI, Combination, Group, GroupsComposition, MatchDayCombinations } from "./calendar-importer.interface";

export class CalendarImporter implements CalendarImporterI {

  groupsComposition: GroupsComposition;
  matchDayCombinations: MatchDayCombinations;

  constructor(
    public matchDayCombinationsBuilder: MatchDayCombinationsBuilder,
    public groupCompositionBuilder: GroupCompositionBuilder
  ) {
    this.groupsComposition = this.groupCompositionBuilder.getGroupsComposition();
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
}
