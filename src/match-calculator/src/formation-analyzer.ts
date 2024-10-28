import { TeamInfo } from "../../models/team-info.model";

export class FormationAnalyzer {

  public readonly formation: '4-4-2' | '3-4-3' | '4-5-1';
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