import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex gap-12">
      <section className="flex h-96 w-96 flex-col justify-between gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl">
        <div className="flex flex-col gap-4">
          <div className="text-4xl font-bold">로그인</div>
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
