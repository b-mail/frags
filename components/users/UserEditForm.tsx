"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { RegisterFields, registerSchema } from "@/lib/schema";
import { updateUser } from "@/lib/api";
import useAuth from "@/store/AuthStore";
import EmailInput from "@/components/users/EmailInput";
import PasswordInput from "@/components/users/PasswordInput";
import NameInput from "@/components/users/NameInput";
import BioInput from "@/components/users/BioInput";
import LoadingModal from "@/components/ui/LoadingModal";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function UserEditForm({ user }: { user: User | null }) {
  const [error, setError] = useState<{ message: string }>({
    message: "",
  });

  const accessToken = useAuth.use.accessToken();
  const setUser = useAuth.use.setUser();

  const router = useRouter();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      password: "",
      bio: user?.bio ?? undefined,
    },
  });

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    try {
      if (!accessToken) {
        return;
      }
      const result = await updateUser(accessToken, data);
      setUser(result.user);
      router.push("/me");
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
      {isSubmitting && <LoadingModal message={"회원 정보 수정 중"} />}
      <div className="rounded-2xl bg-slate-800 p-4 text-green-400">
        회원 정보를 수정하려면 비밀번호가 필요합니다. 아래 입력란에 비밀번호를
        입력해주세요!
      </div>
      <PasswordInput register={register} error={errors.password?.message} />
      <hr className="w-full border border-slate-800" />
      <NameInput register={register} error={errors.name?.message} />
      <EmailInput register={register} error={errors.email?.message} />
      <BioInput
        register={register}
        length={watch("bio")?.length || 0}
        error={errors.bio?.message}
      />
      {error.message && <ErrorMessage message={error.message} />}
      <button
        className="w-full rounded-2xl bg-green-400 py-4 text-lg font-bold text-slate-900 hover:bg-green-500 disabled:bg-slate-500"
        type="submit"
        disabled={isSubmitting}
      >
        회원 정보 수정하기
      </button>
    </form>
  );
}
