export interface PlayerInfo {
  role: 'P' | 'D' | 'C' | 'A';
  fantasyVote?: number;
}

export interface PlayerInfoAVoto {
  role: 'P' | 'D' | 'C' | 'A';
  fantasyVote: number;
}