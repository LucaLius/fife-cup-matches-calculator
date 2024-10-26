import * as fs from 'fs';
import { parseXlsx } from "../excel-utils/excel-parser";
import { INPUT_FILES_TEAMS_DIR_PATH } from "../input-files/input-files.utils";
import { TeamInfo } from "../models/team-info.model";
import { TeamsInfoImporterI } from "./teams-info-importer.interface";
import { PlayerInfo } from '../models/player-info.model';

const MATCHES_PER_FILE = 4;

const matchInfoIndexesCalculator = function (startingIndex: number) {
  return {
    generalInfoIndex: startingIndex,
    formationsIndex: startingIndex + 1,
    firstTitolareIndex: startingIndex + 2,
    lastTitolareIndex: startingIndex + 12,
    firstPanchinaroIndex: startingIndex + 14,
    lastPanchinaroIndex: startingIndex + 21
  }
}

const COLUMNS_INDEXES_SETTINGS = {
  teamOne: {
    nameIndex: 0,
    formationIndex: 0,
    rolePlayerIndex: 0,
    namePlayerIndex: 1,
    votePlayerIndex: 2,
    fantasyVotePlayerIndex: 3,
  },
  teamTwo: {
    nameIndex: 6,
    formationIndex: 6,
    rolePlayerIndex: 6,
    namePlayerIndex: 7,
    votePlayerIndex: 8,
    fantasyVotePlayerIndex: 9,
  }
}

export class TeamsInfoImporter implements TeamsInfoImporterI {

  getTeamsInfo(): TeamInfo[] {
    const fileNames = fs.readdirSync(INPUT_FILES_TEAMS_DIR_PATH);

    const filesContent: string[][][] = [];
    fileNames.forEach(fileName => {
      filesContent.push(parseXlsx(`${INPUT_FILES_TEAMS_DIR_PATH}/${fileName}`));
    });

    const allTeamsInfo: TeamInfo[] = [];
    filesContent.forEach(fileContent => {
      for (let matchIndex = 0; matchIndex < MATCHES_PER_FILE; matchIndex++) {

        const matchesInfoIndexes = this.getMatchesInfoIndexes(fileContent);
        const startingRowIndex = matchesInfoIndexes[matchIndex];

        const allPlayers = this.getAllPlayers(fileContent, startingRowIndex);

        const allPlayersInfoHome = allPlayers.map(player => getPlayerInfo(player, true));
        const teamOneInfo = getTeamInfo(fileContent, startingRowIndex, true, allPlayersInfoHome);

        const allPlayersInfoAway = allPlayers.map(player => getPlayerInfo(player, false))
        const teamTwoInfo = getTeamInfo(fileContent, startingRowIndex, false, allPlayersInfoAway);

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

  getAllPlayers(fileContent: string[][], startingRowIndex: number) {
    const rowIndexes = matchInfoIndexesCalculator(startingRowIndex);
    return [
      ...fileContent.slice(rowIndexes.firstTitolareIndex, rowIndexes.lastTitolareIndex + 1),
      ...fileContent.slice(rowIndexes.firstPanchinaroIndex, rowIndexes.lastPanchinaroIndex + 1)
    ];
  }
}

function getPlayerInfo(player: string[], isHomeTeam: boolean): PlayerInfo {
  const columnIndexes = isHomeTeam ? COLUMNS_INDEXES_SETTINGS.teamOne : COLUMNS_INDEXES_SETTINGS.teamTwo;

  const vote = getVote(player, columnIndexes.votePlayerIndex);
  const fantasyVote = getVote(player, columnIndexes.fantasyVotePlayerIndex);
  return {
    role: player[columnIndexes.rolePlayerIndex],
    name: player[columnIndexes.namePlayerIndex],
    vote,
    fantasyVote
  } as PlayerInfo;
}

function getTeamInfo(fileContent: string[][], startingRowIndex: number, isHomeTeam: boolean, allPlayersInfo: PlayerInfo[]): TeamInfo {
  const rowIndexes = matchInfoIndexesCalculator(startingRowIndex);

  const columnIndexes = isHomeTeam ? COLUMNS_INDEXES_SETTINGS.teamOne : COLUMNS_INDEXES_SETTINGS.teamTwo;
  return {
    teamId: fileContent[rowIndexes.generalInfoIndex][columnIndexes.nameIndex].trim(),
    formation: (fileContent[rowIndexes.formationsIndex][columnIndexes.formationIndex] || '').split('').join('-') as '4-4-2' | '3-4-3',
    allPlayersByRole: {
      P: allPlayersInfo.filter(player => player.role === 'P'),
      D: allPlayersInfo.filter(player => player.role === 'D'),
      C: allPlayersInfo.filter(player => player.role === 'C'),
      A: allPlayersInfo.filter(player => player.role === 'A')
    }
  }
}

function getVote(player: string[], index: number) {
  const targetValue = player[index];
  return Number.isFinite(targetValue) ? targetValue : undefined;
}