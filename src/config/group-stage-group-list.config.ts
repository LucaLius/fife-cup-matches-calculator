import { Team } from "./team-list.config"

const GROUPS = [
  {
    id: 'A',
    teams: [
      Team.SMOKING_BIANCO,
      Team.REAL_DUREZZA,
      Team.BORGO_GRAZZANO,
      Team.ASTON_BIRRA,
    ],
  },
  {
    id: 'B',
    teams: [
      Team.NEROAZZURRI,
      Team.RIVER_BOLUDOS,
      Team.REDBLACK,
      Team.FC_PUSSY_MIX,
    ],
  },
  {
    id: 'C',
    teams: [
      Team.IRON_GAS,
      Team.AHI_3_CROCIATI,
      Team.STARK_INDUSTRIES,
      Team.NOT_ATHLETIC_CRODANZO,
    ],
  },
  {
    id: 'D',
    teams: [
      Team.MANCHESTER_SINTY,
      Team.COCABRODA,
      Team.TEAM_DADA,
      Team.REAL_MAKADAM,
    ],
  },
  {
    id: 'E',
    teams: [
      Team.NAPOLETHANOS,
      Team.BEN_FICA,
      Team.LOS_ANGELO_UN_ESPERTO,
      Team.KANTÉ_CABRIOLET,
    ],
  },
  {
    id: 'F',
    teams: [
      Team.BAYERN_LEVERDUREN,
      Team.CHIAVOVERONICA,
      Team.FC_DIREZIONE,
      Team.DALLAS,
    ],
  },
  {
    id: 'G',
    teams: [
      Team.REAL_GRIFONE,
      Team.DINAMO_KEYV,
      Team.MICCOLILLE,
      Team.CSKA_PIAVON,
    ],
  },
  {
    id: 'H',
    teams: [
      Team.I_RAGAZZI,
      Team.CCORYO_JUNIORS,
      Team.VILLA_FRIGNAVERA,
      Team.ACK_BOMBA,
    ],
  }
];

export function getGroupStageGroups(): { id: string, teams: Team[] }[] {
  return JSON.parse(JSON.stringify(GROUPS));
}

