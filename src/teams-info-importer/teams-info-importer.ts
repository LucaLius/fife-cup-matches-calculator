import * as fs from 'fs';
import { parseXlsx } from "../excel-utils/excel-parser";
import { TeamInfo } from "../models/team-info.model";
import { TeamsInfoImporterI } from "./teams-info-importer.interface";
import { PlayerInfo } from '../models/player-info.model';
import { StaticModifierCaptain } from './modifier-static-captain';
import { ColumnIndexes } from '../models/file-indexes.model';
import { RawFileInfoGetter } from './raw-file-info-getter';
import { TeamsInfoImporterConfig } from './teams-info-importer.config';
import { StaticModifierDefense } from './modifier-static-defense';


export class TeamsInfoImporter implements TeamsInfoImporterI {

  constructor(public inputFilesDirPath: string) { }

  getTeamsInfo(): TeamInfo[] {
    const allTeamsInfo: TeamInfo[] = [];

    const fileNames = fs.readdirSync(this.inputFilesDirPath);

    fileNames.forEach(fileName => {
      const fileContent = parseXlsx(`${this.inputFilesDirPath}/${fileName}`);

      for (let matchIndex = 0; matchIndex < TeamsInfoImporterConfig.MATCHES_PER_FILE; matchIndex++) {

        const matchFileRows = RawFileInfoGetter.getMatchFileRows(fileContent, matchIndex);

        const rawAllPlayers = RawFileInfoGetter.getRawAllPlayers(matchFileRows);

        const homeColumnIndexes = TeamsInfoImporterConfig.COLUMNS_INDEXES_SETTINGS.teamOne;
        const teamOneInfo = getTeamInfo(matchFileRows, rawAllPlayers, homeColumnIndexes);

        const awayColumnIndexes = TeamsInfoImporterConfig.COLUMNS_INDEXES_SETTINGS.teamTwo;
        const teamTwoInfo = getTeamInfo(matchFileRows, rawAllPlayers, awayColumnIndexes);

        allTeamsInfo.push(teamOneInfo);
        allTeamsInfo.push(teamTwoInfo);
      }
    });

    return allTeamsInfo;
  };

}

function getPlayerInfo(player: (string | number)[], columnIndexes: ColumnIndexes): PlayerInfo {
  const fantasyVote = getNumericVoteFromCell(player, columnIndexes.fantasyVotePlayerIndex);
  const voteValue = getNumericVoteFromCell(player, columnIndexes.votePlayerIndex);
  const vote = getVote(voteValue, fantasyVote);
  return {
    role: player[columnIndexes.rolePlayerIndex],
    name: player[columnIndexes.namePlayerIndex],
    vote,
    fantasyVote
  } as PlayerInfo;
}

function getTeamInfo(matchFileRows: (string | number)[][], rawAllPlayers: (string | number)[][], columnIndexes: ColumnIndexes): TeamInfo {
  const rowIndexes = TeamsInfoImporterConfig.matchInfoIndexesCalculator();

  const teamId = (matchFileRows[rowIndexes.generalInfoIndex][columnIndexes.nameIndex] as string).trim();
  const formation = (matchFileRows[rowIndexes.formationsIndex][columnIndexes.formationIndex] as string || '').split('').join('-');

  const captainPoints = new StaticModifierCaptain().getPoints(matchFileRows, columnIndexes);
  const defensePoints = new StaticModifierDefense().getPoints(matchFileRows, columnIndexes);

  const allPlayersInfo = rawAllPlayers.map(player => getPlayerInfo(player, columnIndexes));
  const allPlayersByRole = getAllPlayersByRole(allPlayersInfo);

  const rawTitolari = RawFileInfoGetter.getRawTeamTitolari(matchFileRows, rowIndexes, columnIndexes);
  const rawPanchinari = RawFileInfoGetter.getRawTeamPanchinari(matchFileRows, rowIndexes, columnIndexes);

  return {
    teamId,
    formation,
    captainPoints,
    defensePoints,
    allPlayersByRole,
    rawTitolari,
    rawPanchinari
  }
}

function getAllPlayersByRole(allPlayersInfo: PlayerInfo[]): { P: PlayerInfo[], C: PlayerInfo[], D: PlayerInfo[], A: PlayerInfo[] } {
  return {
    P: allPlayersInfo.filter(player => player.role === 'P'),
    D: allPlayersInfo.filter(player => player.role === 'D'),
    C: allPlayersInfo.filter(player => player.role === 'C'),
    A: allPlayersInfo.filter(player => player.role === 'A')
  };
}

function getNumericVoteFromCell(player: (string | number)[], index: number): number | undefined {
  const targetValue = player[index];
  if (targetValue === '-') {
    // No vote for the player
    return undefined;
  }
  if (typeof targetValue === 'string') {
    // String value? With index passed only numbers should be found
    throw new Error('Unexpected string value in getNumericVoteFromCell() targetValue. Found value is : ' + targetValue);
  }

  return Number.isFinite(targetValue) ? targetValue : undefined;
}

function getVote(vote?: number, fantasyVote?: number): number | undefined {
  // è la get "voto ai fini del conteggio", se fosse solo del valore della cella voto ci sarebbero poi errori nei totali 

  if (fantasyVote !== undefined && vote === undefined) {
    // esempio: giocatori SV ammoniti (fantavoto 5,5 e voto '-')
    return 5;
  }

  return vote;
}