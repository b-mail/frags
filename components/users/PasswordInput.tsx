"use client";

import { RegisterFields } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";
import { useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);

  const className = `${error ? "border-red-400 focus:border-red-400" : "border-slate-700 focus-slate-500"} w-full rounded-2xl border-4 bg-slate-800 p-4 placeholder:text-slate-500 focus:outline-0`;

  return (
    <div className="relative flex flex-col gap-4">
      <label className="text-xl font-bold" htmlFor="password">
        비밀번호
        <span className="text-slate-500">*</span>
      </label>
      <input
        className={className}
        id="password"
        type={showPassword ? "text" : "password"}
        {...register("password")}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-6 top-16"
      >
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 stroke-slate-400 hover:stroke-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 stroke-slate-400 hover:stroke-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        )}
      </button>
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
