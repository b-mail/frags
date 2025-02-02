export default function LoadingIndicator({
  message,
  noShadow = false,
}: {
  message: string;
  noShadow?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-4 rounded-2xl bg-slate-900 p-4 ${noShadow ? "" : "shadow-2xl"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 animate-spin stroke-slate-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
      <div className="text-slate-500">{message}</div>
    </div>
  );
}
