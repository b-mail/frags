"use client";

import { useEffect, useState } from "react";
import EmailInput from "@/components/login-register/EmailInput";
import PasswordInput from "@/components/login-register/PasswordInput";
import NameInput from "@/components/login-register/NameInput";
import BioInput from "@/components/login-register/BioInput";
import { useRouter } from "next/navigation";
import useAuth from "@/store/AuthStore";
import LoadingModal from "@/components/LoadingModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFields, registerSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as signIn } from "@/lib/api";
import ErrorMessage from "@/components/ErrorMessage";

export default function RegisterForm() {
  const [error, setError] = useState<{ message: string }>({
    message: "",
  });
  const router = useRouter();
  const user = useAuth.use.user();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    try {
      const result = await signIn(data);
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <form
      className="flex flex-col gap-8 rounded-2xl bg-slate-900 p-10 shadow-2xl"
      style={{ width: "32rem" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {isSubmitting && <LoadingModal message={"회원가입 중"} />}
      <NameInput register={register} error={errors.name?.message} />
      <EmailInput register={register} error={errors.email?.message} />
      <PasswordInput register={register} error={errors.password?.message} />
      <BioInput
        register={register}
        length={watch("bio")?.length || 0}
        error={errors.bio?.message}
      />
      {error.message && <ErrorMessage message={error.message} />}
      <button
        className="w-full rounded-2xl bg-green-400 py-4 text-lg font-bold hover:bg-green-500 disabled:bg-slate-500"
        type="submit"
        disabled={isSubmitting}
      >
        회원가입하기
      </button>
    </form>
  );
}
