import { create } from "zustand";
import createSelector from "@/store/createSelector";

type State = {
  search: string;
  order: "latest" | "alphabet" | "member";
  filter: "all" | "member" | "admin";
};

type Action = {
  setSearch: (search: State["search"]) => void;
  setOrder: (order: State["order"]) => void;
  setFilter: (filter: State["filter"]) => void;
};

const FragSearchStore = create<State & Action>()((set) => ({
  search: "",
  order: "latest",
  filter: "all",
  setSearch: (search) => set({ search }),
  setOrder: (order) => set({ order }),
  setFilter: (filter) => set({ filter }),
}));

const useFragSearch = createSelector(FragSearchStore);

export default useFragSearch;
