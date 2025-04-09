import { Team } from "./team-list.config"

const CHAMPIONS_LEAGUE_ROUNDS = [
  {
    id: 'LAST_SIXTEENS',
    groups: [
      {
        id: 'A',
        teams: [
          Team.NOT_ATHLETIC_CRODANZO,
          Team.ASTON_BIRRA,
        ],
      },
      {
        id: 'B',
        teams: [
          Team.MICCOLILLE,
          Team.DALLAS,
        ],
      },
      {
        id: 'C',
        teams: [
          Team.TEAM_DADA,
          Team.NEROAZZURRI,
        ],
      },
      {
        id: 'D',
        teams: [
          Team.KANTÉ_CABRIOLET,
          Team.COCABRODA,
        ],
      },
      {
        id: 'E',
        teams: [
          Team.I_RAGAZZI,
          Team.REAL_GRIFONE,
        ],
      },
      {
        id: 'F',
        teams: [
          Team.RIVER_BOLUDOS,
          Team.AHI_3_CROCIATI,
        ],
      },
      {
        id: 'G',
        teams: [
          Team.BAYERN_LEVERDUREN,
          Team.ACK_BOMBA,
        ],
      },
      {
        id: 'H',
        teams: [
          Team.REAL_DUREZZA,
          Team.LOS_ANGELO_UN_ESPERTO,
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
          Team.NOT_ATHLETIC_CRODANZO,
          Team.ASTON_BIRRA,
        ],
      },
      {
        id: 'B',
        teams: [
          Team.TEAM_DADA,
          Team.KANTÉ_CABRIOLET,
        ],
      },
      {
        id: 'C',
        teams: [
          Team.I_RAGAZZI,
          Team.AHI_3_CROCIATI,
        ],
      },
      {
        id: 'D',
        teams: [
          Team.ACK_BOMBA,
          Team.REAL_DUREZZA,
        ],
      }
    ]
  }, {
    id: 'SEMI_FINALS',
    groups: [
      {
        id: 'A',
        teams: [
          Team.ASTON_BIRRA,
          Team.TEAM_DADA,
        ],
      },
      {
        id: 'B',
        teams: [
          Team.AHI_3_CROCIATI,
          Team.ACK_BOMBA,
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

export function getChampionsLeagueRounds(): { id: string, groups: { id: string, teams: Team[] } }[] {
  return JSON.parse(JSON.stringify(CHAMPIONS_LEAGUE_ROUNDS));
}

export function getChampionsLeagueLastSixteensRoundGroups(): { id: string, teams: Team[] }[] {
  const lastSixteensRound = CHAMPIONS_LEAGUE_ROUNDS.find(round => round.id === 'LAST_SIXTEENS');
  return JSON.parse(JSON.stringify(lastSixteensRound?.groups ?? []));
}

export function getChampionsLeagueQuarterFinalsRoundGroups(): { id: string, teams: Team[] }[] {
  const quarterFinalsRound = CHAMPIONS_LEAGUE_ROUNDS.find(round => round.id === 'QUARTER_FINALS');
  return JSON.parse(JSON.stringify(quarterFinalsRound?.groups ?? []));
}

export function getChampionsLeagueSemiFinalsRoundGroups(): { id: string, teams: Team[] }[] {
  const semiFinalsRound = CHAMPIONS_LEAGUE_ROUNDS.find(round => round.id === 'SEMI_FINALS');
  return JSON.parse(JSON.stringify(semiFinalsRound?.groups ?? []));
}

export function getChampionsLeagueFinalsRoundGroups(): { id: string, teams: Team[] }[] {
  const finalsRound = CHAMPIONS_LEAGUE_ROUNDS.find(round => round.id === 'FINALS');
  return JSON.parse(JSON.stringify(finalsRound?.groups ?? []));
}

