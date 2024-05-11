export default function FragFilter({
  filter,
  setFilter,
}: {
  filter: "all" | "member" | "admin";
  setFilter: (filter: "all" | "member" | "admin") => void;
}) {
  return (
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
  );
}
