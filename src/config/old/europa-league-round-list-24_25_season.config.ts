import { Team_24_25 } from './team-list-24_25_season.config';

const EUROPA_LEAGUE_ROUNDS = [
  {
    id: 'LAST_SIXTEENS',
    groups: [
      {
        id: 'A',
        teams: [
          Team_24_25.FC_DIREZIONE,
          Team_24_25.CHIAVOVERONICA,
        ],
      },
      {
        id: 'B',
        teams: [
          Team_24_25.REDBLACK,
          Team_24_25.FC_PUSSY_MIX,
        ],
      },
      {
        id: 'C',
        teams: [
          Team_24_25.NAPOLETHANOS,
          Team_24_25.BORGO_GRAZZANO,
        ],
      },
      {
        id: 'D',
        teams: [
          Team_24_25.CCORYO_JUNIORS,
          Team_24_25.BEN_FICA,
        ],
      },
      {
        id: 'E',
        teams: [
          Team_24_25.REAL_MAKADAM,
          Team_24_25.VILLA_FRIGNAVERA,
        ],
      },
      {
        id: 'F',
        teams: [
          Team_24_25.IRON_GAS,
          Team_24_25.CSKA_PIAVON,
        ],
      },
      {
        id: 'G',
        teams: [
          Team_24_25.SMOKING_BIANCO,
          Team_24_25.STARK_INDUSTRIES,
        ],
      },
      {
        id: 'H',
        teams: [
          Team_24_25.DINAMO_KEYV,
          Team_24_25.MANCHESTER_SINTY,
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
          Team_24_25.CHIAVOVERONICA,
          Team_24_25.FC_PUSSY_MIX,
        ],
      },
      {
        id: 'B',
        teams: [
          Team_24_25.BORGO_GRAZZANO,
          Team_24_25.CCORYO_JUNIORS,
        ],
      },
      {
        id: 'C',
        teams: [
          Team_24_25.VILLA_FRIGNAVERA,
          Team_24_25.IRON_GAS,
        ],
      },
      {
        id: 'D',
        teams: [
          Team_24_25.SMOKING_BIANCO,
          Team_24_25.DINAMO_KEYV,
        ],
      }
    ]
  }, {
    id: 'SEMI_FINALS',
    groups: [
      {
        id: 'A',
        teams: [
          Team_24_25.CHIAVOVERONICA,
          Team_24_25.CCORYO_JUNIORS,
        ],
      },
      {
        id: 'B',
        teams: [
          Team_24_25.VILLA_FRIGNAVERA,
          Team_24_25.DINAMO_KEYV,
        ]
      }
    ]
  }, {
    id: 'FINALS',
    groups: [
      {
        id: 'A',
        teams: [
          Team_24_25.TBD,
          Team_24_25.TBD,
        ]
      }
    ]
  }
];

export function getEuropaLeagueRounds24_25(): { id: string, teams: Team_24_25[] }[] {
  return JSON.parse(JSON.stringify(EUROPA_LEAGUE_ROUNDS));
}


export function getEuropaLeagueLastSixteensRoundGroups24_25(): { id: string, teams: Team_24_25[] }[] {
  const lastSixteensRound = EUROPA_LEAGUE_ROUNDS.find(round => round.id === 'LAST_SIXTEENS');
  return JSON.parse(JSON.stringify(lastSixteensRound?.groups ?? []));
}

export function getEuropaLeagueQuarterFinalsRoundGroups24_25(): { id: string, teams: Team_24_25[] }[] {
  const quarterFinalsRound = EUROPA_LEAGUE_ROUNDS.find(round => round.id === 'QUARTER_FINALS');
  return JSON.parse(JSON.stringify(quarterFinalsRound?.groups ?? []));
}

export function getEuropaLeagueSemiFinalsRoundGroups24_25(): { id: string, teams: Team_24_25[] }[] {
  const semiFinalsRound = EUROPA_LEAGUE_ROUNDS.find(round => round.id === 'SEMI_FINALS');
  return JSON.parse(JSON.stringify(semiFinalsRound?.groups ?? []));
}

export function getEuropaLeagueFinalsRoundGroups24_25(): { id: string, teams: Team_24_25[] }[] {
  const semiFinalsRound = EUROPA_LEAGUE_ROUNDS.find(round => round.id === 'FINALS');
  return JSON.parse(JSON.stringify(semiFinalsRound?.groups ?? []));
}
