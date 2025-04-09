import { getChampionsLeagueFinalsRoundGroups, getChampionsLeagueLastSixteensRoundGroups, getChampionsLeagueQuarterFinalsRoundGroups, getChampionsLeagueSemiFinalsRoundGroups } from "../config/champions-league-round-list.config";
import { getEuropaLeagueFinalsRoundGroups, getEuropaLeagueLastSixteensRoundGroups, getEuropaLeagueQuarterFinalsRoundGroups, getEuropaLeagueSemiFinalsRoundGroups } from "../config/europa-league-round-list.config";
import { Team } from "../config/team-list.config";
import { Competition } from "../enums/competition.enum";
import { EliminationPhaseRoundGroupCompositionBuilder } from "./builders/group-compositions-builder/elimination-phase-round-group-composition-builder";
import { GroupCompositionBuilder } from "./builders/group-compositions-builder/group-composition-builder.interface";
import { GroupCompositionGroupStageBuilder } from "./builders/group-compositions-builder/group-composition-group-stage-builder";

export class GroupCompositionFactory {

  private competition: string;
  private matchDay: number;

  constructor(competition: string, matchDay: number) {
    this.competition = competition;
    this.matchDay = matchDay;
  }

  build(): GroupCompositionBuilder {

    if (this.competition === undefined) {
      throw new Error('competition type must be provided');
    }

    if (this.competition === Competition.GROUP_STAGE) {
      return new GroupCompositionGroupStageBuilder();
    }

    if (this.competition === Competition.CHAMPIONS_LEAGUE) {
      let groups = [{ id: 'NULL', teams: [Team.TBD, Team.TBD] }];
      if (this.matchDay === 1) {
        groups = getChampionsLeagueLastSixteensRoundGroups();
      }
      if (this.matchDay === 2) {
        groups = getChampionsLeagueQuarterFinalsRoundGroups();
      }
      if (this.matchDay === 3) {
        groups = getChampionsLeagueSemiFinalsRoundGroups();
      }
      if (this.matchDay === 4) {
        groups = getChampionsLeagueFinalsRoundGroups();
      }
      return new EliminationPhaseRoundGroupCompositionBuilder(groups);
    }

    if (this.competition === Competition.EUROPA_LEAGUE) {
      let groups = [{ id: 'NULL', teams: [Team.TBD, Team.TBD] }];

      if (this.matchDay === 1) {
        groups = getEuropaLeagueLastSixteensRoundGroups();
      }
      if (this.matchDay === 2) {
        groups = getEuropaLeagueQuarterFinalsRoundGroups();
      }
      if (this.matchDay === 3) {
        groups = getEuropaLeagueSemiFinalsRoundGroups();
      }
      if (this.matchDay === 4) {
        groups = getEuropaLeagueFinalsRoundGroups();
      }
      return new EliminationPhaseRoundGroupCompositionBuilder(groups);
    }

    throw new Error('Invalid competition or matchDay');
  }
}