"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "@/store/AuthStore";
import EmailInput from "@/components/users/EmailInput";
import PasswordInput from "@/components/users/PasswordInput";
import LoadingModal from "@/components/ui/LoadingModal";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { LoginFields, loginSchema } from "@/lib/schema";
import { deleteUserByUserId } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

export default function UserDeleteForm() {
  const [error, setError] = useState<{ message: string }>({
    message: "",
  });

  const user = useAuth.use.user();
  const accessToken = useAuth.use.accessToken();
  const setUser = useAuth.use.setUser();
  const setAccessToken = useAuth.use.setAccessToken();

  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      if (!accessToken || !user) {
        return;
      }
      await deleteUserByUserId(accessToken, user.id, data);
      setUser(null);
      setAccessToken(null);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  return (
    <form
      className="w-192 flex flex-col gap-8 rounded-2xl bg-slate-900 p-10 shadow-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isSubmitting && <LoadingModal message={"회원 정보 삭제 중"} />}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xl font-bold text-red-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 stroke-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
          회원탈퇴 시 아래 정보가 모두 영구 삭제됩니다.
        </div>
        <ul className="flex list-disc flex-col gap-2 rounded-2xl bg-slate-800 px-10 py-4">
          <li className="text-slate-400">내가 만든 FRAGS</li>
          <li className="text-slate-400">작성한 게시글 및 댓글</li>
          <li className="text-slate-400">좋아요 기록</li>
        </ul>
      </div>
      <hr className="w-full border border-slate-800" />
      <EmailInput register={register} error={errors.email?.message} />
      <PasswordInput register={register} error={errors.password?.message} />
      {error.message && <ErrorMessage message={error.message} />}
      <button
        className="w-full rounded-2xl bg-red-400 py-4 text-lg font-bold text-slate-900 hover:bg-red-500 disabled:bg-slate-500"
        type="submit"
        disabled={isSubmitting}
      >
        회원탈퇴하기
      </button>
    </form>
  );
}
