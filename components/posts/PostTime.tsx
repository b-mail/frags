export default function PostTime({ date }: { date: string }) {
  return (
    <div className="flex items-center justify-between gap-1 rounded-lg bg-slate-800 p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5 stroke-slate-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>

      <div className="text-sm text-slate-400">
        {date.toString().slice(11, 16)}
      </div>
    </div>
  );
}
