import { LoginFields, RegisterFields } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";

export default function PasswordInput({
  register,
  error,
}: {
  register:
    | UseFormRegister<{
        email: string;
        password: string;
        name?: string;
        bio?: string;
      }>
    | UseFormRegister<RegisterFields>;
  error?: string;
}) {
  const className = `${error ? "border-red-400 focus:border-red-400" : "border-slate-700 focus-slate-500"} w-full rounded-2xl border-4 bg-slate-800 p-4 placeholder:text-slate-500 focus:outline-0`;

  return (
    <div className="flex flex-col gap-4">
      <label className="text-xl font-bold" htmlFor="password">
        비밀번호
        <span className="text-slate-500">*</span>
      </label>
      <input
        className={className}
        id="password"
        type="password"
        {...register("password")}
      />
      {error && <div className="text-sm text-red-400">{error}</div>}
      <ul className="list-disc pl-4">
        <li className="text-sm text-slate-500">
          8글자 이상, 15글자 이하여야 합니다.
        </li>
        <li className="text-sm text-slate-500">
          영문, 숫자, 특수문자를 모두 포함해야 합니다.
        </li>
        <li className="text-sm text-slate-500">
          특수문자는 ! @ # * & 만 허용됩니다.
        </li>
      </ul>
    </div>
  );
}
