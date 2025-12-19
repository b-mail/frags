import { RegisterFields } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";

export default function BioInput({
  register,
  length,
  error,
}: {
  register: UseFormRegister<RegisterFields>;
  length: number;
  error?: string;
}) {
  const className = `${error ? "border-red-400 focus:border-red-400" : "border-slate-700 focus:border-slate-500"} w-full rounded-2xl border-4 bg-slate-800 p-4 placeholder:text-slate-500 focus:outline-0`;

  return (
    <div className="flex flex-col gap-4">
      <label className="text-xl font-bold" htmlFor="bio">
        한 줄 소개
        <span
          className={`ml-2 text-sm font-medium ${length > 20 ? "text-red-400" : "text-slate-500"}`}
        >
          {length} / 20
        </span>
      </label>
      <input
        className={className}
        id="bio"
        placeholder="여러분을 소개해주세요!"
        {...register("bio")}
      />
      {error && <div className="text-sm text-red-400">{error}</div>}
    </div>
  );
}
