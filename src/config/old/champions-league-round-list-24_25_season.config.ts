import { Team_24_25 } from './team-list-24_25_season.config';

const CHAMPIONS_LEAGUE_ROUNDS = [
  {
    id: 'LAST_SIXTEENS',
    groups: [
      {
        id: 'A',
        teams: [
          Team_24_25.NOT_ATHLETIC_CRODANZO,
          Team_24_25.ASTON_BIRRA,
        ],
      },
      {
        id: 'B',
        teams: [
          Team_24_25.MICCOLILLE,
          Team_24_25.DALLAS,
        ],
      },
      {
        id: 'C',
        teams: [
          Team_24_25.TEAM_DADA,
          Team_24_25.NEROAZZURRI,
        ],
      },
      {
        id: 'D',
        teams: [
          Team_24_25.KANTÉ_CABRIOLET,
          Team_24_25.COCABRODA,
        ],
      },
      {
        id: 'E',
        teams: [
          Team_24_25.I_RAGAZZI,
          Team_24_25.REAL_GRIFONE,
        ],
      },
      {
        id: 'F',
        teams: [
          Team_24_25.RIVER_BOLUDOS,
          Team_24_25.AHI_3_CROCIATI,
        ],
      },
      {
        id: 'G',
        teams: [
          Team_24_25.BAYERN_LEVERDUREN,
          Team_24_25.ACK_BOMBA,
        ],
      },
      {
        id: 'H',
        teams: [
          Team_24_25.REAL_DUREZZA,
          Team_24_25.LOS_ANGELO_UN_ESPERTO,
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
          Team_24_25.NOT_ATHLETIC_CRODANZO,
          Team_24_25.ASTON_BIRRA,
        ],
      },
      {
        id: 'B',
        teams: [
          Team_24_25.TEAM_DADA,
          Team_24_25.KANTÉ_CABRIOLET,
        ],
      },
      {
        id: 'C',
        teams: [
          Team_24_25.I_RAGAZZI,
          Team_24_25.AHI_3_CROCIATI,
        ],
      },
      {
        id: 'D',
        teams: [
          Team_24_25.ACK_BOMBA,
          Team_24_25.REAL_DUREZZA,
        ],
      }
    ]
  }, {
    id: 'SEMI_FINALS',
    groups: [
      {
        id: 'A',
        teams: [
          Team_24_25.ASTON_BIRRA,
          Team_24_25.TEAM_DADA,
        ],
      },
      {
        id: 'B',
        teams: [
          Team_24_25.AHI_3_CROCIATI,
          Team_24_25.ACK_BOMBA,
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

export function getChampionsLeagueRounds24_25(): { id: string, groups: { id: string, teams: Team_24_25[] } }[] {
  return JSON.parse(JSON.stringify(CHAMPIONS_LEAGUE_ROUNDS));
}

export function getChampionsLeagueLastSixteensRoundGroups24_25(): { id: string, teams: Team_24_25[] }[] {
  const lastSixteensRound = CHAMPIONS_LEAGUE_ROUNDS.find(round => round.id === 'LAST_SIXTEENS');
  return JSON.parse(JSON.stringify(lastSixteensRound?.groups ?? []));
}

export function getChampionsLeagueQuarterFinalsRoundGroups24_25(): { id: string, teams: Team_24_25[] }[] {
  const quarterFinalsRound = CHAMPIONS_LEAGUE_ROUNDS.find(round => round.id === 'QUARTER_FINALS');
  return JSON.parse(JSON.stringify(quarterFinalsRound?.groups ?? []));
}

export function getChampionsLeagueSemiFinalsRoundGroups24_25(): { id: string, teams: Team_24_25[] }[] {
  const semiFinalsRound = CHAMPIONS_LEAGUE_ROUNDS.find(round => round.id === 'SEMI_FINALS');
  return JSON.parse(JSON.stringify(semiFinalsRound?.groups ?? []));
}

export function getChampionsLeagueFinalsRoundGroups24_25(): { id: string, teams: Team_24_25[] }[] {
  const finalsRound = CHAMPIONS_LEAGUE_ROUNDS.find(round => round.id === 'FINALS');
  return JSON.parse(JSON.stringify(finalsRound?.groups ?? []));
}

