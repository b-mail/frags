import Link from "next/link";
import LoginForm from "@/components/users/LoginForm";

export let metadata = {
  title: "로그인 | FRAGS",
  description: "FRAGS 로그인 페이지입니다.",
};

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-10 md:flex-row md:items-start">
      <section className="flex w-full max-w-sm flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-linear-to-br from-slate-800 to-slate-900 p-8 shadow-2xl md:p-10">
        <div className="flex flex-col gap-4">
          <h2 className="flex items-center gap-2 text-4xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-9 stroke-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            로그인
          </h2>
          <hr className="border border-slate-800" />
          <div className="flex flex-col gap-2 py-2 md:gap-4 md:py-4">
            <p className="text-slate-300">FRAGS에 오신 걸 환영합니다!</p>
            <p className="text-slate-300">
              지금 바로 로그인하여 당신만의 커뮤니티 활동을 시작하세요.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <hr className="border border-slate-800" />
            <div className="flex flex-col gap-2 pt-4">
              <span className="text-sm text-slate-500">회원이 아니신가요?</span>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-slate-800 px-4 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-green-400"
                href="/register"
              >
                회원가입하러 가기
              </Link>
            </div>
          </div>
        </div>
      </section>
      <LoginForm />
    </div>
  );
}
