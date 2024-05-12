export default function FragOrder({
  order,
  setOrder,
}: {
  order: "latest" | "alphabet" | "member";
  setOrder: (order: "latest" | "alphabet" | "member") => void;
}) {
  return (
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
  );
}
