import { User } from "@prisma/client";
import { create } from "zustand";
import createSelector from "@/store/createSelector";

type State = {
  user: User | null;
  accessToken: string | null;
  isRefreshing: boolean;
};

type Action = {
  setUser: (user: State["user"]) => void;
  setAccessToken: (accessToken: State["accessToken"]) => void;
  setIsRefreshing: (isRefreshing: State["isRefreshing"]) => void;
};

const AuthStore = create<State & Action>()((set) => ({
  user: null,
  accessToken: null,
  isRefreshing: true,
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setIsRefreshing: (isRefreshing) => set({ isRefreshing }),
}));

const useAuth = createSelector(AuthStore);

export default useAuth;
