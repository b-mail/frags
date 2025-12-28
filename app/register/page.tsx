import Link from "next/link";
import RegisterForm from "@/components/users/RegisterForm";

export let metadata = {
  title: "회원가입 | FRAGS",
  description: "FRAGS 회원가입 페이지입니다.",
};

export default function RegisterPage() {
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
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            회원가입
          </h2>
          <hr className="border border-slate-800" />
          <div className="flex flex-col gap-2 py-2 md:gap-4 md:py-4">
            <p className="text-slate-300">FRAGS가 처음이신가요?</p>
            <p className="text-slate-300">
              지금 바로 가입하여 다양한 에너지를 공유하고 새로운 사람들을
              만나보세요.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <hr className="border border-slate-800" />
            <div className="flex flex-col gap-2 pt-4">
              <span className="text-sm text-slate-500">이미 회원이신가요?</span>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-slate-800 px-4 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-green-400"
                href="/login"
              >
                로그인하러 가기
              </Link>
            </div>
          </div>
        </div>
      </section>
      <RegisterForm />
    </div>
  );
}
