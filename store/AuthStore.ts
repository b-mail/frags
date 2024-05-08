import { User } from "@prisma/client";
import { create } from "zustand";
import createSelector from "@/store/createSelector";

type State = {
  user: User | null;
};

type Action = {};

const AuthStore = create<State & Action>()((set) => ({
  user: null,
}));

const useAuth = createSelector(AuthStore);

export default useAuth;
