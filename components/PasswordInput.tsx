import { ChangeEventHandler } from "react";

export default function PasswordInput({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-xl font-bold" htmlFor="password">
        비밀번호
        <span className="text-slate-500">*</span>
      </label>
      <input
        className="w-full rounded-2xl border-4 border-slate-700 bg-slate-800 p-4 placeholder:text-slate-500 focus:border-slate-600 focus:outline-0"
        id="password"
        name="password"
        type="password"
        value={value}
        onChange={onChange}
      />

      <ul className="list-disc pl-4">
        <li className="text-sm text-slate-500">
          8글자 이상, 15글자 이하여야 합니다.
        </li>
        <li className="text-sm text-slate-500">
          영문, 숫자, 기호를 모두 포함해야 합니다.
        </li>
        <li className="text-sm text-slate-500">
          기호는 ! @ # * - 만 허용됩니다.
        </li>
      </ul>
    </div>
  );
}
