import { TeamInfo } from "../../models/team-info.model";

export class FormationAnalyzer {

  public readonly formation: string;
  public readonly numberOfP: number;
  public readonly numberOfD: number;
  public readonly numberOfC: number;
  public readonly numberOfA: number;

  constructor(teamInfo: TeamInfo) {
    this.formation = teamInfo.formation;
    const formationRoles = teamInfo.formation.split('-');
    this.numberOfP = 1;
    this.numberOfD = Number.parseInt(formationRoles[0]);
    this.numberOfC = Number.parseInt(formationRoles[1]);
    this.numberOfA = Number.parseInt(formationRoles[2]);
  }
}