import { User } from "@prisma/client";
import { create } from "zustand";
import createSelector from "@/store/createSelector";

type State = {
  user: User | null;
  accessToken: string | null;
};

type Action = {
  setUser: (user: State["user"]) => void;
  setAccessToken: (accessToken: State["accessToken"]) => void;
};

const AuthStore = create<State & Action>()((set) => ({
  user: null,
  accessToken: null,
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
}));

const useAuth = createSelector(AuthStore);

export default useAuth;
