import { UseFormRegister } from "react-hook-form";
import { RegisterFields } from "@/lib/schema";

export default function EmailInput({
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
      <label className="text-xl font-bold" htmlFor="email">
        이메일 <span className="text-slate-500">*</span>
      </label>
      <input
        className={className}
        id="email"
        type="text"
        placeholder="frags@example.com"
        {...register("email")}
      />
      {error && <div className="text-sm text-red-400">{error}</div>}
    </div>
  );
}
