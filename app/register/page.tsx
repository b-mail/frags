import Link from "next/link";
import RegisterForm from "@/components/login-register/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex gap-12">
      <section className="flex h-96 w-96 flex-col justify-between gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl">
        <div className="flex flex-col gap-4">
          <div className="text-4xl font-bold">회원가입</div>
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
