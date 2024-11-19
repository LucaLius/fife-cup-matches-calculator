import { PlayerInfo, PlayerInfoAVoto } from "../../models/player-info.model";
import { TeamInfo } from "../../models/team-info.model";
import { FormationAnalyzer } from "./formation-analyzer";
import { CrossTeamCalculationEsit, ModifiersCrossTeamsManager } from "./modifiers/modifiers-cross-team-manager";
import { ModifiersManager } from "./modifiers/modifiers-manager";

const FANTASY_VOTE_GOALKEEPER_RISERVA_UFFICIO = 1;
const FANTASY_VOTE_MOVEMENT_PLAYER_RISERVA_UFFICIO = 3;

export function getCrossTeamsPointsScored(homeTeamInfo: TeamInfo, awayTeamInfo: TeamInfo): CrossTeamCalculationEsit {
  const homeFormationAnalyzer = new FormationAnalyzer(homeTeamInfo);
  const awayFormationAnalyzer = new FormationAnalyzer(awayTeamInfo);

  const homePlayersAVoto = getPlayersAVoto(homeTeamInfo, homeFormationAnalyzer);
  const awayPlayersAVoto = getPlayersAVoto(awayTeamInfo, awayFormationAnalyzer);

  return new ModifiersCrossTeamsManager(homeTeamInfo.teamId, awayTeamInfo.teamId, homePlayersAVoto, awayPlayersAVoto)
    .applyModifiers(homeTeamInfo.teamId, awayTeamInfo.teamId, homeFormationAnalyzer, awayFormationAnalyzer);
}

export function getTeamsPointsScored(teamInfo: TeamInfo): number {
  const formationAnalyzer = new FormationAnalyzer(teamInfo);

  const playersAVoto = getPlayersAVoto(teamInfo, formationAnalyzer);

  const modifiers = new ModifiersManager(teamInfo, playersAVoto).applyModifiers(formationAnalyzer);
  return modifiers + playersAVoto
    .map(el => el.fantasyVote)
    .reduce(getSum);
}

function getPlayersAVoto(teamInfo: TeamInfo, formationAnalyzer: FormationAnalyzer): PlayerInfoAVoto[] {

  const goalkeepers = getRepartoPlayersInfoAVoto(teamInfo.allPlayersByRole.P, formationAnalyzer.numberOfP);
  const defenders = getRepartoPlayersInfoAVoto(teamInfo.allPlayersByRole.D, formationAnalyzer.numberOfD);
  const midfielders = getRepartoPlayersInfoAVoto(teamInfo.allPlayersByRole.C, formationAnalyzer.numberOfC);
  const strikers = getRepartoPlayersInfoAVoto(teamInfo.allPlayersByRole.A, formationAnalyzer.numberOfA);

  const playersAVoto: PlayerInfoAVoto[] = [
    ...goalkeepers.slice(0, formationAnalyzer.numberOfP),
    ...defenders.slice(0, formationAnalyzer.numberOfD),
    ...midfielders.slice(0, formationAnalyzer.numberOfC),
    ...strikers.slice(0, formationAnalyzer.numberOfA),
  ];

  return playersAVoto;
}

function getRepartoPlayersInfoAVoto(players: PlayerInfo[], numeroTitolari: number): PlayerInfoAVoto[] {
  const aVoto = players.filter(isAVoto) as PlayerInfoAVoto[];
  const currentRole = players[0].role;
  const riserveUfficio = getRiserveUfficio(aVoto, numeroTitolari, currentRole);
  return [...aVoto, ...riserveUfficio];
}

function getRiserveUfficio(aVoto: PlayerInfo[], targetNumber: number, currentRole: 'P' | 'D' | 'C' | 'A'): PlayerInfoAVoto[] {
  const riserveUfficio: PlayerInfoAVoto[] = [];
  while ((aVoto.length + riserveUfficio.length) < targetNumber) {
    riserveUfficio.push({
      role: currentRole,
      name: 'Riserva d \'ufficio',
      vote: currentRole === 'P' ? FANTASY_VOTE_GOALKEEPER_RISERVA_UFFICIO : FANTASY_VOTE_MOVEMENT_PLAYER_RISERVA_UFFICIO,
      fantasyVote: currentRole === 'P' ? FANTASY_VOTE_GOALKEEPER_RISERVA_UFFICIO : FANTASY_VOTE_MOVEMENT_PLAYER_RISERVA_UFFICIO,
      isRiservaUfficio: true
    });
  }

  return riserveUfficio;
}

function isAVoto(playerInfo: PlayerInfo): boolean {
  return playerInfo.fantasyVote !== undefined;
}

function getSum(acc: number, value: number): number {
  return acc + value;
}