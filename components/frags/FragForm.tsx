"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FragFields, fragSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFrag } from "@/lib/api";
import useAuth from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import LoadingModal from "@/components/ui/LoadingModal";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Link from "next/link";

export default function FragForm() {
  const [error, setError] = useState({
    message: "",
  });

  const accessToken = useAuth.use.accessToken();

  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FragFields>({
    resolver: zodResolver(fragSchema),
  });

  const onSubmit: SubmitHandler<FragFields> = async (data) => {
    try {
      await createFrag(accessToken!, data);
      queryClient.invalidateQueries({
        queryKey: ["frags"],
      });
      router.push("/frags");
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isSubmitting && <LoadingModal message={"FRAG 생성 중"} />}
      <label className="text-xl font-bold" htmlFor="name">
        FRAG 이름
      </label>
      <input
        className={`${errors?.name ? "border-red-400 focus:border-red-400" : "border-slate-700 focus:border-slate-500"} overflow-scroll rounded-2xl border-4 bg-slate-800 p-4 placeholder:text-slate-400 focus:outline-0`}
        style={{ width: "32rem" }}
        id={"name"}
        placeholder="2글자 이상, 10글자 이하로 입력해주세요"
        {...register("name")}
      />
      {errors.name && (
        <div className="text-sm text-red-400">{errors.name.message}</div>
      )}
      <hr className="border border-slate-700" />
      <label
        className="text-xl font-bold"
        htmlFor="description
      "
      >
        FRAG 설명
        <span
          className={`ml-2 text-sm font-medium ${watch("description")?.length > 100 ? "text-red-400" : "text-slate-500"}`}
        >
          {watch("description")?.length ?? 0} / 100
        </span>
      </label>
      <textarea
        className={`${errors?.description ? "border-red-400 focus:border-red-400" : "border-slate-700 focus:border-slate-500"} h-32 resize-none overflow-scroll rounded-2xl border-4 bg-slate-800 p-4 placeholder:text-slate-400 focus:outline-0`}
        id={"description" + ""}
        placeholder="FRAG을 소개해주세요."
        {...register("description")}
      />
      {errors.description && (
        <div className="text-sm text-red-400">{errors.description.message}</div>
      )}
      <div className="flex w-full items-center justify-end gap-4">
        <div className="grow">
          {error.message && <ErrorMessage message={error.message} />}
        </div>
        <Link
          className="flex h-12 w-14 items-center justify-center rounded-2xl bg-slate-800 text-center text-slate-400 hover:text-red-400"
          href="/frags"
        >
          취소
        </Link>
        <button
          className="h-12 w-24 rounded-2xl bg-green-400 font-bold text-slate-900 hover:bg-green-500 disabled:bg-slate-500"
          type={"submit"}
          disabled={isSubmitting}
        >
          확인
        </button>
      </div>
    </form>
  );
}
