export default function PostOrder({
  order,
  setOrder,
}: {
  order: "latest" | "like";
  setOrder: (order: "latest" | "like") => void;
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
        className={`${order === "like" ? "text-green-400" : "text-slate-500  hover:text-slate-400"}`}
        onClick={() => setOrder("like")}
      >
        좋아요순
      </button>
    </div>
  );
}
