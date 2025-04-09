import { Team } from "./team-list.config"

const EUROPA_LEAGUE_ROUNDS = [
  {
    id: 'LAST_SIXTEENS',
    groups: [
      {
        id: 'A',
        teams: [
          Team.FC_DIREZIONE,
          Team.CHIAVOVERONICA,
        ],
      },
      {
        id: 'B',
        teams: [
          Team.REDBLACK,
          Team.FC_PUSSY_MIX,
        ],
      },
      {
        id: 'C',
        teams: [
          Team.NAPOLETHANOS,
          Team.BORGO_GRAZZANO,
        ],
      },
      {
        id: 'D',
        teams: [
          Team.CCORYO_JUNIORS,
          Team.BEN_FICA,
        ],
      },
      {
        id: 'E',
        teams: [
          Team.REAL_MAKADAM,
          Team.VILLA_FRIGNAVERA,
        ],
      },
      {
        id: 'F',
        teams: [
          Team.IRON_GAS,
          Team.CSKA_PIAVON,
        ],
      },
      {
        id: 'G',
        teams: [
          Team.SMOKING_BIANCO,
          Team.STARK_INDUSTRIES,
        ],
      },
      {
        id: 'H',
        teams: [
          Team.DINAMO_KEYV,
          Team.MANCHESTER_SINTY,
        ],
      }
    ]
  },
  {
    id: 'QUARTER_FINALS',
    groups: [
      {
        id: 'A',
        teams: [
          Team.CHIAVOVERONICA,
          Team.FC_PUSSY_MIX,
        ],
      },
      {
        id: 'B',
        teams: [
          Team.BORGO_GRAZZANO,
          Team.CCORYO_JUNIORS,
        ],
      },
      {
        id: 'C',
        teams: [
          Team.VILLA_FRIGNAVERA,
          Team.IRON_GAS,
        ],
      },
      {
        id: 'D',
        teams: [
          Team.SMOKING_BIANCO,
          Team.DINAMO_KEYV,
        ],
      }
    ]
  }, {
    id: 'SEMI_FINALS',
    groups: [
      {
        id: 'A',
        teams: [
          Team.CHIAVOVERONICA,
          Team.CCORYO_JUNIORS,
        ],
      },
      {
        id: 'B',
        teams: [
          Team.VILLA_FRIGNAVERA,
          Team.DINAMO_KEYV,
        ]
      }
    ]
  }, {
    id: 'FINALS',
    groups: [
      {
        id: 'A',
        teams: [
          Team.TBD,
          Team.TBD,
        ]
      }
    ]
  }
];

export function getEuropaLeagueRounds(): { id: string, teams: Team[] }[] {
  return JSON.parse(JSON.stringify(EUROPA_LEAGUE_ROUNDS));
}


export function getEuropaLeagueLastSixteensRoundGroups(): { id: string, teams: Team[] }[] {
  const lastSixteensRound = EUROPA_LEAGUE_ROUNDS.find(round => round.id === 'LAST_SIXTEENS');
  return JSON.parse(JSON.stringify(lastSixteensRound?.groups ?? []));
}

export function getEuropaLeagueQuarterFinalsRoundGroups(): { id: string, teams: Team[] }[] {
  const quarterFinalsRound = EUROPA_LEAGUE_ROUNDS.find(round => round.id === 'QUARTER_FINALS');
  return JSON.parse(JSON.stringify(quarterFinalsRound?.groups ?? []));
}

export function getEuropaLeagueSemiFinalsRoundGroups(): { id: string, teams: Team[] }[] {
  const semiFinalsRound = EUROPA_LEAGUE_ROUNDS.find(round => round.id === 'SEMI_FINALS');
  return JSON.parse(JSON.stringify(semiFinalsRound?.groups ?? []));
}

export function getEuropaLeagueFinalsRoundGroups(): { id: string, teams: Team[] }[] {
  const semiFinalsRound = EUROPA_LEAGUE_ROUNDS.find(round => round.id === 'FINALS');
  return JSON.parse(JSON.stringify(semiFinalsRound?.groups ?? []));
}
