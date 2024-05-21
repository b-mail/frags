import Link from "next/link";

export default async function NotFoundPage() {
  return (
    <div className="w-192 flex flex-col items-center justify-center gap-6 rounded-2xl bg-slate-900 p-10 shadow-2xl">
      <div className="flex items-start justify-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10 stroke-red-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-red-400">
          해당 페이지를 찾을 수 없어요
        </h1>
      </div>
      <div className="flex w-full flex-col gap-2 rounded-2xl bg-slate-800 px-10 py-6">
        <div className="text-slate-400">
          찾고 계신 페이지가 존재하지 않아요! 다시 한 번 확인해주세요.
        </div>
        <div className="text-slate-400">
          페이지가 존재하지 않거나, 주소가 잘못 입력되었을 수 있어요.
        </div>
      </div>
      <Link
        className="rounded-2xl bg-green-400 p-4 font-bold text-slate-900 hover:bg-green-500"
        href="/"
      >
        홈페이지로 이동하기
      </Link>
    </div>
  );
}
