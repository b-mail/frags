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
    <div className="flex w-full flex-col items-center justify-between gap-4 rounded-2xl bg-slate-900 p-4 shadow-2xl md:p-6">
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-md">
          <SearchInput search={search} setSearch={setSearch} />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm md:text-base">
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
      <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
        <button
          className={`${filter === "all" ? "bg-slate-800 text-green-400 cursor-default" : "text-slate-500 hover:bg-slate-800 hover:text-slate-400 cursor-pointer"} flex-1 rounded-xl py-2 text-center text-sm md:rounded-2xl md:text-base`}
          onClick={() => setFilter("all")}
        >
          전체 FRAGS
        </button>
        <button
          className={`${filter === "member" ? "bg-slate-800 text-green-400 cursor-default" : "text-slate-500 hover:bg-slate-800 hover:text-slate-400 cursor-pointer"} flex-1 rounded-xl py-2 text-center text-sm md:rounded-2xl md:text-base`}
          onClick={() => setFilter("member")}
        >
          내가 가입한 FRAGS
        </button>
        <button
          className={`${filter === "admin" ? "bg-slate-800 text-green-400 cursor-default" : "text-slate-500 hover:bg-slate-800 hover:text-slate-400 cursor-pointer"} flex-1 rounded-xl py-2 text-center text-sm md:rounded-2xl md:text-base`}
          onClick={() => setFilter("admin")}
        >
          내가 만든 FRAGS
        </button>
      </div>
    </div>
  );
}
