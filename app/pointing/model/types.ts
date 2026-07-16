export const VOTE_OPTIONS = ["1", "2", "3", "5", "8", "13", "?", "☕"] as const;

export type ParticipantVote = (typeof VOTE_OPTIONS)[number] | null;

export type Participant = {
  id: string;
  name: string;
  vote: ParticipantVote;
};

export type Room = {
  code: string;
  participants: Record<string, Participant>;
  revealVotes: boolean;
  moderators: string[];
  createdAt: Date;
};

export type RoomUpdateInput = {
  revealVotes?: boolean;
  participants?: Record<string, Participant>;
  moderators?: string[];
};
