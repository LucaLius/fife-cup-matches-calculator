import { Team } from "./team-list.config"

const CHAMPIONS_LEAGUE_ROUNDS = [
  {
    id: 'LAST_SIXTEENS',
    groups: [
      {
        id: 'A',
        teams: [
          Team.I_RAGAZZI,
          Team.AHI_3_CROCIATI,
        ],
      },
      {
        id: 'B',
        teams: [
          Team.CHIAVOVERONICA,
          Team.NEROAZZURRI,
        ],
      },
      {
        id: 'C',
        teams: [
          Team.REAL_DUREZZA,
          Team.RIVER_BOLUDOS,
        ],
      },
      {
        id: 'D',
        teams: [
          Team.CALCIO_BAILADO,
          Team.ASTON_BIRRA,
        ],
      },
      {
        id: 'E',
        teams: [
          Team.CSKA_PIAVON,
          Team.PARIS_SAN_GENNAR,
        ],
      },
      {
        id: 'F',
        teams: [
          Team.DINAMO_KEIV,
          Team.IRON_GAS,
        ],
      },
      {
        id: 'G',
        teams: [
          Team.TEAM_DADA,
          Team.ACK_BOMBA,
        ],
      },
      {
        id: 'H',
        teams: [
          Team.JOGA_BENITO,
          Team.KANTÉ_CABRIOLET,
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
          Team.AHI_3_CROCIATI,
          Team.CHIAVOVERONICA,
        ],
      },
      {
        id: 'B',
        teams: [
          Team.RIVER_BOLUDOS,
          Team.CALCIO_BAILADO,
        ],
      },
      {
        id: 'C',
        teams: [
          Team.PARIS_SAN_GENNAR,
          Team.DINAMO_KEIV,
        ],
      },
      {
        id: 'D',
        teams: [
          Team.TEAM_DADA,
          Team.JOGA_BENITO,
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
          Team.CALCIO_BAILADO,
        ],
      },
      {
        id: 'B',
        teams: [
          Team.PARIS_SAN_GENNAR,
          Team.TEAM_DADA,
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

