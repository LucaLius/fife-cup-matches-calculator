import { PlayerInfo, PlayerInfoAVoto } from "../../models/player-info.model";
import { TeamInfo } from "../../models/team-info.model";
import { FormationAnalyzer } from "./formation-analyzer";
import { ModifiersManager } from "./modifiers/modifiers-manager";

const FANTASY_VOTE_GOALKEEPER_RISERVA_UFFICIO = 1;
const FANTASY_VOTE_MOVEMENT_PLAYER_RISERVA_UFFICIO = 3;

export function getTeamsPointsScored(teamInfo: TeamInfo): number {

  const formationAnalyzer = new FormationAnalyzer(teamInfo);

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

  const modifiers = new ModifiersManager(playersAVoto).applyModifiers(formationAnalyzer);
  return modifiers + playersAVoto
    .map(el => el.fantasyVote)
    .reduce(getSum);
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