import { ChangeEventHandler } from "react";

export default function NameInput({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-xl font-bold" htmlFor="name">
        이름 <span className="text-slate-500">*</span>
      </label>
      <input
        className="w-1/2 rounded-2xl border-4 border-slate-700 bg-slate-800 p-4 placeholder:text-slate-500 focus:border-slate-600 focus:outline-0"
        id="name"
        name="name"
        placeholder="멋쟁이 신사"
        value={value}
        onChange={onChange}
      />
      <ul className="list-disc pl-4">
        <li className="text-sm text-slate-500">
          2글자 이상, 8글자 이하여야 합니다.
        </li>
        <li className="text-sm text-slate-500">한글, 영문만 허용됩니다.</li>
      </ul>
    </div>
  );
}
