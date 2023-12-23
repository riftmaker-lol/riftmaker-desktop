import { StateCreator } from "zustand";
import { State } from ".";

export interface LeagueClientState {
  connected: boolean;
  setConnected: (connected: boolean) => void;
}

const createLeagueClientSlice: StateCreator<State, [], [], LeagueClientState> = (set) => ({
  connected: false,
  setConnected: (connected) => set({ connected }),
});

export default createLeagueClientSlice;
