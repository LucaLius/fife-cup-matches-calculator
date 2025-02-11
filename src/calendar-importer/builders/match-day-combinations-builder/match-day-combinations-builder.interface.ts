import { MatchDayCombinations } from "../calendar-importer.interface";

export interface MatchDayCombinationsBuilder {

  readonly matchDayCombinations: MatchDayCombinations;

  getMatchDayCombinations(): MatchDayCombinations;

}