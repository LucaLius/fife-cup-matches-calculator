import { getGroupStage24_25Groups } from "./old/group-stage-group-list-24_25_season.config";
import { Team } from "./team-list.config"

const GROUPS = [
  {
    id: 'A',
    teams: [
      Team.IRON_GAS,
      Team.FC_DIREZIONE,
      Team.JOGA_BENITO,
      Team.TOTTOMAN,
    ],
  },
  {
    id: 'B',
    teams: [
      Team.NEROAZZURRI,
      Team.COCABRODA,
      Team.GUNS_N_GOSENS,
      Team.CSKA_PIAVON,
    ],
  },
  {
    id: 'C',
    teams: [
      Team.SMOKING_BIANCO,
      Team.REAL_DUREZZA,
      Team.IL_CANEPARDO,
      Team.ASTON_BIRRA,
    ],
  },
  {
    id: 'D',
    teams: [
      Team.I_RAGAZZI,
      Team.AHI_3_CROCIATI,
      Team.GINO_PIPINOTTO,
      Team.DALLAS,
    ],
  },
  {
    id: 'E',
    teams: [
      Team.REAL_GRIFONE,
      Team.RIVER_BOLUDOS,
      Team.VILLA_FRIGNAVERA,
      Team.CALCIO_BAILADO,
    ],
  },
  {
    id: 'F',
    teams: [
      Team.GLI_SBORRATI,
      Team.CHIAVOVERONICA,
      Team.NAPOLETHANOS,
      Team.KANTÉ_CABRIOLET,
    ],
  },
  {
    id: 'G',
    teams: [
      Team.DINAMO_KEYV,
      Team.ACK_BOMBA,
      Team.LOS_ANGELO_UN_ESPERTO,
      Team.NOT_ATHLETIC_CRODANZO,
    ],
  },
  {
    id: 'H',
    teams: [
      Team.REDBLACK,
      Team.PARIS_SAN_GENNAR,
      Team.TEAM_DADA,
      Team.REAL_MAKADAM,
    ],
  }
];

export function getGroupStageGroups(oldSeason?: '24_25'): { id: string, teams: Team[] }[] {
  if (oldSeason === '24_25') {
    // For test purpose
    return getGroupStage24_25Groups();
  }
  return JSON.parse(JSON.stringify(GROUPS));
}

