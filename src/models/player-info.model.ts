export interface PlayerInfo {
  role: 'P' | 'D' | 'C' | 'A';
  fantasyVote?: number;
  isRiservaUfficio?: boolean;
}

export interface PlayerInfoAVoto {
  role: 'P' | 'D' | 'C' | 'A';
  fantasyVote: number;
  isRiservaUfficio?: boolean;
}