import * as fs from 'fs';
import { parseXlsx } from "../excel-utils/excel-parser";
import { TeamInfo } from "../models/team-info.model";
import { TeamsInfoImporterI } from "./teams-info-importer.interface";
import { PlayerInfo } from '../models/player-info.model';
import { StaticModifierCaptain } from './modifier-static-captain';
import { ColumnIndexes, RowIndexes } from '../models/file-indexes.model';
import { RawFileInfoGetter } from './raw-file-info-getter';
import { TeamsInfoImporterConfig } from './teams-info-importer.config';

const MATCHES_PER_FILE = 4;

const COLUMNS_INDEXES_SETTINGS = {
  teamOne: {
    nameIndex: 0,
    formationIndex: 0,
    rolePlayerIndex: 0,
    modifierIdIndex: 0,
    namePlayerIndex: 1,
    serieATeamInex: 2,
    votePlayerIndex: 3,
    fantasyVotePlayerIndex: 4,
    modifierValueIndex: 4
  } as ColumnIndexes,
  teamTwo: {
    nameIndex: 6,
    formationIndex: 6,
    rolePlayerIndex: 6,
    modifierIdIndex: 6,
    namePlayerIndex: 7,
    serieATeamInex: 8,
    votePlayerIndex: 9,
    fantasyVotePlayerIndex: 10,
    modifierValueIndex: 10
  } as ColumnIndexes
}

export class TeamsInfoImporter implements TeamsInfoImporterI {

  constructor(public inputFilesDirPath: string) { }

  getTeamsInfo(): TeamInfo[] {
    const fileNames = fs.readdirSync(this.inputFilesDirPath);

    const filesContent: string[][][] = [];
    fileNames.forEach(fileName => {
      filesContent.push(parseXlsx(`${this.inputFilesDirPath}/${fileName}`));
    });

    const allTeamsInfo: TeamInfo[] = [];
    filesContent.forEach(fileContent => {
      for (let matchIndex = 0; matchIndex < MATCHES_PER_FILE; matchIndex++) {

        const matchesInfoIndexes = this.getMatchesInfoIndexes(fileContent);
        const startingRowIndex = matchesInfoIndexes[matchIndex];
        const maximumRowIndex = matchesInfoIndexes[matchIndex + 1] || 999;
        const matchFileRows = fileContent.slice(startingRowIndex, maximumRowIndex);

        const rowIndexes = TeamsInfoImporterConfig.matchInfoIndexesCalculator(startingRowIndex);

        const rawAllPlayers = RawFileInfoGetter.getRawAllPlayers(fileContent, rowIndexes);

        const homeColumnIndexes = COLUMNS_INDEXES_SETTINGS.teamOne;
        const teamOneInfo = getTeamInfo(matchFileRows, rawAllPlayers, rowIndexes, homeColumnIndexes);

        const awayColumnIndexes = COLUMNS_INDEXES_SETTINGS.teamTwo;
        const teamTwoInfo = getTeamInfo(matchFileRows, rawAllPlayers, rowIndexes, awayColumnIndexes);

        allTeamsInfo.push(teamOneInfo);
        allTeamsInfo.push(teamTwoInfo);
      }
    });

    return allTeamsInfo;
  };

  getMatchesInfoIndexes(fileContent: string[][]): number[] {
    const fileContentIndexed = fileContent.map((row, index) => ({ row, index }));

    // is always the one row with "Team name", <4 empty items>, "Result like N-N", "Team name"
    const generalInfoRows = fileContentIndexed.filter(el => {
      return el.row[0] && !Number.isFinite(el.row[0]) &&
        el.row[5] && el.row[5].match(/[\d]-[\d]/g) &&
        el.row[6] && !Number.isFinite(el.row[6]);
    });

    return generalInfoRows.map(el => el.index);
  }

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

function getTeamInfo(matchFileRows: (string | number)[][], rawAllPlayers: (string | number)[][], rowIndexes: RowIndexes, columnIndexes: ColumnIndexes): TeamInfo {
  const teamId = (matchFileRows[rowIndexes.generalInfoIndex][columnIndexes.nameIndex] as string).trim();
  const formation = (matchFileRows[rowIndexes.formationsIndex][columnIndexes.formationIndex] as string || '').split('').join('-');

  const captainPoints = StaticModifierCaptain.getPoints(matchFileRows, columnIndexes);

  const allPlayersInfo = rawAllPlayers.map(player => getPlayerInfo(player, columnIndexes));
  const allPlayersByRole = getAllPlayersByRole(allPlayersInfo);

  const rawTitolari = RawFileInfoGetter.getRawTeamTitolari(matchFileRows, rowIndexes, columnIndexes);
  const rawPanchinari = RawFileInfoGetter.getRawTeamPanchinari(matchFileRows, rowIndexes, columnIndexes);

  return {
    teamId,
    formation,
    captainPoints,
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