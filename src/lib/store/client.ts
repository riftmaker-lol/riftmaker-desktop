import { Lobby } from "@/types/rito";
import { StateCreator } from "zustand";
import { State } from ".";

export interface LeagueClientState {
  connected: boolean;
  setConnected: (connected: boolean) => void;
  lobby: null | Lobby;
  setLobby: (lobby: Lobby) => void;
}

const createLeagueClientSlice: StateCreator<State, [], [], LeagueClientState> = (set) => ({
  connected: false,
  lobby: null,
  setConnected: (connected) => set({ connected }),
  setLobby: (lobby) => set({ lobby }),
});

export default createLeagueClientSlice;
