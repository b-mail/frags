import { User } from "@prisma/client";
import { create } from "zustand";
import createSelector from "@/store/createSelector";
import axios from "@/lib/axios";

type State = {
  user: User | null;
  accessToken: string | null;
};

type Action = {
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
};

const AuthStore = create<State & Action>()((set) => ({
  user: null,
  accessToken: null,
  login: async ({ email, password }) => {
    const { data } = await axios.post("/auth/login", { email, password });
    set({ user: data.user, accessToken: data.accessToken });
  },
  logout: async () => {
    await axios.delete("/auth/logout");
    set({ user: null, accessToken: null });
  },
}));

const useAuth = createSelector(AuthStore);

export default useAuth;
