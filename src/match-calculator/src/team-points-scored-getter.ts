import { PlayerInfo, PlayerInfoAVoto } from "../../models/player-info.model";
import { TeamInfo } from "../../models/team-info.model";

const FANTASY_VOTE_GOALKEEPER_RISERVA_UFFICIO = 1;
const FANTASY_VOTE_MOVEMENT_PLAYER_RISERVA_UFFICIO = 3;

export function getTeamsPointsScored(teamInfo: TeamInfo): number {

  const formation = teamInfo.formation.split('-');
  const numberOfP = 1;
  const numberOfD = Number.parseInt(formation[0]);
  const numberOfC = Number.parseInt(formation[1]);
  const numberOfA = Number.parseInt(formation[2]);

  const goalkeepers = getRepartoPlayersInfoAVoto(teamInfo.allPlayersByRole.P, numberOfP);
  const defenders = getRepartoPlayersInfoAVoto(teamInfo.allPlayersByRole.D, numberOfD);
  const midfielders = getRepartoPlayersInfoAVoto(teamInfo.allPlayersByRole.C, numberOfC);
  const strikers = getRepartoPlayersInfoAVoto(teamInfo.allPlayersByRole.A, numberOfA);
  const playersAVoto: PlayerInfoAVoto[] = [
    ...goalkeepers.slice(0, numberOfP),
    ...defenders.slice(0, numberOfD),
    ...midfielders.slice(0, numberOfC),
    ...strikers.slice(0, numberOfA),
  ];

  return playersAVoto
    .map(el => el.fantasyVote)
    .reduce(getSum)
}

function getRepartoPlayersInfoAVoto(players: PlayerInfo[], numeroTitolari: number,): PlayerInfoAVoto[] {
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
      fantasyVote: currentRole === 'P' ? FANTASY_VOTE_GOALKEEPER_RISERVA_UFFICIO : FANTASY_VOTE_MOVEMENT_PLAYER_RISERVA_UFFICIO
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