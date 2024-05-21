import Link from "next/link";
import LoginForm from "@/components/users/LoginForm";

export let metadata = {
  title: "로그인 | FRAGS",
  description: "FRAGS 로그인 페이지입니다.",
};

export default function LoginPage() {
  return (
    <div className="flex gap-12">
      <section className="flex h-96 w-96 flex-col justify-between gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl">
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
          <p>FRAGS에 오신 걸 환영합니다!</p>
          <p>지금 바로 로그인하여 FRAGS를 즐겨주세요.</p>
        </div>
        <div className="flex flex-col gap-4">
          <hr className="border border-slate-800" />
          <div className="flex gap-4">
            <div className="text-slate-500">회원이 아니신가요?</div>
            <Link
              className="text-slate-500 hover:text-green-400"
              href="/register"
            >
              회원가입하러 가기
            </Link>
          </div>
        </div>
      </section>
      <LoginForm />
    </div>
  );
}
