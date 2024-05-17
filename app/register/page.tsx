import Link from "next/link";
import RegisterForm from "@/components/users/RegisterForm";

export default function RegisterPage() {
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
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            회원가입
          </h2>
          <hr className="border border-slate-800" />
          <p>FRAGS가 처음이신가요?</p>
          <p>회원가입을 통해 FRAGS의 다양한 서비스를 이용해보세요.</p>
        </div>
        <div className="flex flex-col gap-4">
          <hr className="border border-slate-800" />
          <div className="flex gap-4">
            <div className="text-slate-500">이미 회원이신가요?</div>
            <Link className="text-slate-500 hover:text-green-400" href="/login">
              로그인하러 가기
            </Link>
          </div>
        </div>
      </section>
      <RegisterForm />
    </div>
  );
}
