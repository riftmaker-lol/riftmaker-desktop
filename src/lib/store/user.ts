import { User } from "@/types/riftmaker";
import { StateCreator } from "zustand";
import { State } from ".";
import api from "../axios";

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  fetchUser: () => void;
}

const createUserSlice: StateCreator<State, [], [], UserState> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
  fetchUser: async () => {
    // TODO: maybe move this to react query
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await api.get<{ user: User }>("user");
    if (!response.data) {
      localStorage.removeItem("token");
      return set({ user: null });
    }

    const user = response.data?.user;
    return set({ user });
  },
});

export default createUserSlice;
