import { ChampionsLastSixteensGroupCompositionBuilder } from "./builders/group-compositions-builder/champions-last-sixteens-group-composition-builder";
import { ChampionsQuarterFinalsGroupCompositionBuilder } from "./builders/group-compositions-builder/champions-quarter-finals-group-composition-builder";
import { EuropeLastSixteensGroupCompositionBuilder } from "./builders/group-compositions-builder/europe-last-sixteens-group-composition-builder";
import { EuropeQuarterFinalsGroupCompositionBuilder } from "./builders/group-compositions-builder/europe-quarter-finals-group-composition-builder";
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

    if (this.competition === 'GROUP_STAGE') {
      return new GroupCompositionGroupStageBuilder();
    }

    if (this.competition === 'CHAMPIONS_LEAGUE') {
      if (this.matchDay === 1) {
        return new ChampionsLastSixteensGroupCompositionBuilder();
      }
      if (this.matchDay === 2) {
        return new ChampionsQuarterFinalsGroupCompositionBuilder();
      }
      if (this.matchDay === 3) {
        // return new ChampionsSemiFinalsGroupCompositionBuilder();
      }
    }

    if (this.competition === 'EUROPA_LEAGUE') {
      if (this.matchDay === 1) {
        return new EuropeLastSixteensGroupCompositionBuilder();
      }
      if (this.matchDay === 2) {
        return new EuropeQuarterFinalsGroupCompositionBuilder();
      }
      if (this.matchDay === 3) {
        // return new EuropeSemiFinalsGroupCompositionBuilder();
      }
    }

    throw new Error('Invalid competition or matchDay');
  }
}