export enum PlayerRole {
  TOP = "TOP",
  JUNGLE = "JUNGLE",
  MID = "MID",
  ADC = "ADC",
  SUPPORT = "SUPPORT",
  FILL = "FILL",
}

export interface User {
  id: string;
  name: string;
  elo: string;
  riotId: string;
  role: string;
}

export enum TournamentStatus {
  CREATED = "CREATED",
  ACCEPTING_PARTICIPANTS = "ACCEPTING_PARTICIPANTS",
  READY = "READY",
  FINISHED = "FINISHED",
}

export interface Tournament {
  id: string;
  name: string;
  status: TournamentStatus;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  participants: Participant[];
  kickedPlayers: Participant[];
  teams: Team[];
}

export interface Participant {
  id: string;
  riotId: string;
  name: string;
  role: string;
  elo: string;
  image: string;
  tournamentId: string;
  kicked: boolean;
}

export interface Team {
  id: string;
  name: string;
  tournamentId: string;
  players: Player[];
}

export interface Player {
  id: string;
  riotId: string;
  name: string;
  role: string;
  elo: string;
  image: string;
  mainRole: string;
}
