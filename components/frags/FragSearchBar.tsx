"use client";

import SearchInput from "@/components/ui/SearchInput";
import useFragSearch from "@/store/FragSearchStore";

export default function FragSearchBar() {
  const search = useFragSearch.use.search();
  const setSearch = useFragSearch.use.setSearch();

  const order = useFragSearch.use.order();
  const setOrder = useFragSearch.use.setOrder();

  const filter = useFragSearch.use.filter();
  const setFilter = useFragSearch.use.setFilter();

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-900 p-4 shadow-2xl">
      <div className="flex items-center justify-between">
        <SearchInput search={search} setSearch={setSearch} />
        <div className="flex w-96 items-center justify-end gap-4">
          <button
            className={`${order === "latest" ? "text-green-400" : "text-slate-500  hover:text-slate-400"}`}
            onClick={() => setOrder("latest")}
          >
            최신순
          </button>
          <button
            className={`${order === "alphabet" ? "text-green-400" : "text-slate-500  hover:text-slate-400"}`}
            onClick={() => setOrder("alphabet")}
          >
            가나다순
          </button>
          <button
            className={`${order === "member" ? "text-green-400" : "text-slate-500  hover:text-slate-400"}`}
            onClick={() => setOrder("member")}
          >
            멤버 많은 순
          </button>
        </div>
      </div>
      <hr className="w-full border border-slate-700" />
      <div className="flex w-full items-center justify-between">
        <button
          className={`${filter === "all" ? "bg-slate-800" : "text-slate-500 hover:text-slate-400"} w-60 rounded-2xl py-2 text-center`}
          onClick={() => setFilter("all")}
        >
          전체 FRAGS
        </button>
        <button
          className={`${filter === "member" ? "bg-slate-800" : "text-slate-500 hover:text-slate-400"} w-60 rounded-2xl py-2 text-center`}
          onClick={() => setFilter("member")}
        >
          내가 가입한 FRAGS
        </button>
        <button
          className={`${filter === "admin" ? "bg-slate-800" : "text-slate-500 hover:text-slate-400"} w-60 rounded-2xl py-2 text-center`}
          onClick={() => setFilter("admin")}
        >
          내가 만든 FRAGS
        </button>
      </div>
    </div>
  );
}
