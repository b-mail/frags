import { create } from "zustand";
import createSelector from "@/store/createSelector";

type State = {
  search: string;
  order: "latest" | "like";
};

type Action = {
  setSearch: (search: State["search"]) => void;
  setOrder: (order: State["order"]) => void;
};

const PostSearchStore = create<State & Action>()((set) => ({
  search: "",
  order: "latest",
  setSearch: (search) => set({ search }),
  setOrder: (order) => set({ order }),
}));

const usePostSearch = createSelector(PostSearchStore);

export default usePostSearch;
