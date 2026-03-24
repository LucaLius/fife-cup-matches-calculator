import { Team } from "./team-list.config"

const EUROPA_LEAGUE_ROUNDS = [
  {
    id: 'LAST_SIXTEENS',
    groups: [
      {
        id: 'A',
        teams: [
          Team.NOT_ATHLETIC_CRODANZO,
          Team.LOS_ANGELO_UN_ESPERTO,
        ],
      },
      {
        id: 'B',
        teams: [
          Team.DALLAS,
          Team.SMOKING_BIANCO,
        ],
      },
      {
        id: 'C',
        teams: [
          Team.COCABRODA,
          Team.REAL_MAKADAM,
        ],
      },
      {
        id: 'D',
        teams: [
          Team.REDBLACK,
          Team.VILLA_FRIGNAVERA,
        ],
      },
      {
        id: 'E',
        teams: [
          Team.TOTTOMAN,
          Team.FC_DIREZIONE,
        ],
      },
      {
        id: 'F',
        teams: [
          Team.GLI_SBORRATI,
          Team.NAPOLETHANOS,
        ],
      },
      {
        id: 'G',
        teams: [
          Team.REAL_GRIFONE,
          Team.GINO_PIPINOTTO,
        ],
      },
      {
        id: 'H',
        teams: [
          Team.IL_CANEPARDO,
          Team.GUNS_N_GOSENS,
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
          Team.LOS_ANGELO_UN_ESPERTO,
          Team.DALLAS,
        ],
      },
      {
        id: 'B',
        teams: [
          Team.REAL_MAKADAM,
          Team.VILLA_FRIGNAVERA,
        ],
      },
      {
        id: 'C',
        teams: [
          Team.FC_DIREZIONE,
          Team.GLI_SBORRATI,
        ],
      },
      {
        id: 'D',
        teams: [
          Team.GINO_PIPINOTTO,
          Team.GUNS_N_GOSENS,
        ],
      }
    ]
  }, {
    id: 'SEMI_FINALS',
    groups: [
      {
        id: 'A',
        teams: [
          Team.LOS_ANGELO_UN_ESPERTO,
          Team.REAL_MAKADAM,
        ],
      },
      {
        id: 'B',
        teams: [
          Team.GLI_SBORRATI,
          Team.GUNS_N_GOSENS,
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
