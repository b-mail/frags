"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import EmailInput from "@/components/users/EmailInput";
import PasswordInput from "@/components/users/PasswordInput";
import { login } from "@/lib/api";
import LoadingModal from "@/components/ui/LoadingModal";
import useAuth from "@/store/AuthStore";
import { LoginFields, loginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<{ message: string }>({
    message: "",
  });

  const user = useAuth.use.user();
  const setUser = useAuth.use.setUser();
  const setAccessToken = useAuth.use.setAccessToken();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      const result = await login(data);
      setUser(result.user);
      setAccessToken(result.accessToken);
      router.push("/frags");
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/frags");
    }
  }, [user, router]);

  return (
    <form
      className="flex flex-col gap-8 rounded-2xl bg-slate-900 p-10 shadow-2xl"
      style={{ width: "32rem" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {isSubmitting && <LoadingModal message={"로그인 중"} />}
      <EmailInput register={register} error={errors.email?.message} />
      <PasswordInput register={register} error={errors.password?.message} />
      {error.message && <ErrorMessage message={error.message} />}
      <button
        className="w-full rounded-2xl bg-green-400 py-4 text-lg font-bold hover:bg-green-500 disabled:bg-slate-500"
        type="submit"
        disabled={isSubmitting}
      >
        로그인하기
      </button>
    </form>
  );
}
