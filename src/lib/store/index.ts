import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import createLeagueClientSlice, { LeagueClientState } from "./client";
import createUserSlice, { UserState } from "./user";

export type State = UserState & LeagueClientState;

export const useStore = create<State>()(
  devtools(
    persist<State>(
      (...a) => ({
        ...createUserSlice(...a),
        ...createLeagueClientSlice(...a),
      }),
      {
        name: "riftmaker-desktop-storage",
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) =>
          Object.fromEntries(Object.entries(state).filter(([key]) => !["connected"].includes(key))) as State,
      },
    ),
  ),
);
