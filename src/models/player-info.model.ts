export interface PlayerInfo {
  role: 'P' | 'D' | 'C' | 'A';
  name?: string;
  vote?: number;
  fantasyVote?: number;
  isRiservaUfficio?: boolean;
}

export interface PlayerInfoAVoto {
  role: 'P' | 'D' | 'C' | 'A';
  name?: string;
  vote: number;
  fantasyVote: number;
  isRiservaUfficio?: boolean;
}