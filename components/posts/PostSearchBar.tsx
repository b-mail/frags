"use client";

import usePostSearch from "@/store/PostSearchStore";
import SearchInput from "@/components/ui/SearchInput";

export default function PostSearchBar() {
  const search = usePostSearch.use.search();
  const setSearch = usePostSearch.use.setSearch();

  const order = usePostSearch.use.order();
  const setOrder = usePostSearch.use.setOrder();

  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-slate-900 p-4 shadow-2xl">
      <SearchInput search={search} setSearch={setSearch} />
      <div className="flex w-96 items-center justify-end gap-4">
        <button
          className={`${order === "latest" ? "text-green-400" : "text-slate-500  hover:text-slate-400"}`}
          onClick={() => setOrder("latest")}
        >
          최신순
        </button>
        <button
          className={`${order === "like" ? "text-green-400" : "text-slate-500  hover:text-slate-400"}`}
          onClick={() => setOrder("like")}
        >
          좋아요순
        </button>
      </div>
    </div>
  );
}
