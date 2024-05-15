import { UseFormRegister } from "react-hook-form";
import { RegisterFields } from "@/lib/schema";

export default function NameInput({
  register,
  error,
}: {
  register: UseFormRegister<RegisterFields>;
  error?: string;
}) {
  const className = `${error ? "border-red-400 focus:border-red-400" : "border-slate-700 focus-slate-500"} w-full rounded-2xl border-4 bg-slate-800 p-4 placeholder:text-slate-500 focus:outline-0`;
  return (
    <div className="flex flex-col gap-4">
      <label className="text-xl font-bold" htmlFor="name">
        이름 <span className="text-slate-500">*</span>
      </label>
      <input
        className={className}
        id="name"
        placeholder="멋쟁이 신사"
        {...register("name")}
      />
      {error && <div className="text-sm text-red-400">{error}</div>}
      <ul className="list-disc pl-4">
        <li className="text-sm text-slate-500">
          2글자 이상, 8글자 이하여야 합니다.
        </li>
        <li className="text-sm text-slate-500">
          한글, 영문, 공백만 허용됩니다.
        </li>
      </ul>
    </div>
  );
}
