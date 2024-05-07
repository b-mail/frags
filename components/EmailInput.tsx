import { ChangeEventHandler } from "react";

export default function EmailInput({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-xl font-bold" htmlFor="email">
        이메일 <span className="text-slate-500">*</span>
      </label>
      <input
        className="w-2/3 rounded-2xl border-4 border-slate-700 bg-slate-800 p-4 placeholder:text-slate-500 focus:border-slate-600 focus:outline-0"
        id="email"
        name="email"
        type="email"
        placeholder="frags@example.com"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
