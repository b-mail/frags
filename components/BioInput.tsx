import { ChangeEventHandler } from "react";

export default function BioInput({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-xl font-bold" htmlFor="bio">
        한 줄 소개
        <span className="ml-4 text-sm text-slate-500">{value.length}/20</span>
      </label>
      <input
        className="w-full rounded-2xl border-4 border-slate-700 bg-slate-800 p-4 placeholder:text-slate-500 focus:border-slate-600 focus:outline-0"
        id="bio"
        name="bio"
        placeholder="여러분을 소개해주세요!"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
