export interface SummonerProfile {
  accountId: number
  displayName: string
  gameName: string
  internalName: string
  nameChangeFlag: boolean
  percentCompleteForNextLevel: number
  profileIconId: number
  puuid: string
  summonerId: number
  summonerLevel: number
  tagLine: string
}

export interface Lobby {
  canStartActivity: boolean;
  gameConfig: GameConfig;
  invitations: Invitation[];
  localMember: LocalMember;
  members: Member[];
}

export interface Invitation {
  invitationId: string;
  state: string;
  timestamp: string;
  toSummonerId: number;
  invitationType: string;
  toSummonerName: string;
}

export interface GameConfig {
  allowablePremadeSizes: unknown[];
  customLobbyName: string;
  customMutatorName: string;
  customRewardsDisabledReasons: unknown[];
  customSpectatorPolicy: string;
  customSpectators: unknown[];
  customTeam100: CustomTeam100[];
  customTeam200: unknown[];
  gameMode: string;
  isCustom: boolean;
  isLobbyFull: boolean;
  isTeamBuilderManaged: boolean;
  mapId: number;
  maxHumanPlayers: number;
  maxLobbySize: number;
  maxTeamSize: number;
  pickType: string;
  premadeSizeAllowed: boolean;
  queueId: number;
  showPositionSelector: boolean;
}

export interface CustomTeam100 {
  firstPositionPreference: string;
  isBot: boolean;
  isLeader: boolean;
  isSpectator: boolean;
  puuid: string;
  ready: boolean;
  secondPositionPreference: string;
  showGhostedBanner: boolean;
  summonerIconId: number;
  summonerId: number;
  summonerInternalName: string;
  summonerLevel: number;
  summonerName: string;
  teamId: number;
}

export interface LocalMember {
  firstPositionPreference: string;
  isBot: boolean;
  isLeader: boolean;
  isSpectator: boolean;
  puuid: string;
  ready: boolean;
  secondPositionPreference: string;
  summonerIconId: number;
  summonerId: number;
  summonerInternalName: string;
  summonerLevel: number;
  summonerName: string;
  teamId: number;
}

export interface Member {
  firstPositionPreference: string;
  isBot: boolean;
  isLeader: boolean;
  isSpectator: boolean;
  puuid: string;
  ready: boolean;
  secondPositionPreference: string;
  summonerIconId: number;
  summonerId: number;
  summonerInternalName: string;
  summonerLevel: number;
  summonerName: string;
  teamId: number;
}
