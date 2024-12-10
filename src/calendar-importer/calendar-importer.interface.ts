import { CalendarMatch } from "../models/calendar-match.model";

export interface CalendarImporterI {

  groupsComposition: GroupsComposition;

  matchDayCombinations: MatchDayCombinations;

  getCalendarMatches(matchDay: number): CalendarMatch[];

  getMatchDayMatches(matchDay: number): CalendarMatch[];
}

export type GroupsComposition = {
  [groupId: string]: Group
}

export class Group {

  public idGroup!: number;
  public teamIdA!: string;
  public teamIdB!: string;
  public teamIdC!: string;
  public teamIdD!: string;

  getTeamIdFromOriginGroup(originGroup: string): string {

    if (originGroup === 'A') {
      return this.teamIdA;
    }

    if (originGroup === 'B') {
      return this.teamIdB;
    }

    if (originGroup === 'C') {
      return this.teamIdC;
    }

    if (originGroup === 'D') {
      return this.teamIdD;
    }

    throw new Error('Invalid origin group id ' + originGroup);
  }
}

export type MatchDayCombinations = {
  [matchDay: number]: Combination[];
}

export type Combination = {
  homeTeamGroup: string;
  awayTeamGroup: string;
}