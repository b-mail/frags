"use client";

import { getFragByFragId, updateFragByFragId } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "@/lib/type";
import { Frag } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { FragFields, fragSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingContainer from "@/components/ui/LoadingContainer";
import useAuth from "@/store/AuthStore";
import { useEffect, useState } from "react";
import LoadingModal from "@/components/ui/LoadingModal";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function FragEditForm({ fragId }: { fragId: number }) {
  const [error, setError] = useState<{ message: string } | null>(null);

  const accessToken = useAuth.use.accessToken();

  const queryClient = useQueryClient();

  const { data, isPending } = useQuery<ApiResponse<Frag>>({
    queryKey: ["frag", fragId],
    queryFn: async () => await getFragByFragId(fragId),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FragFields>({
    resolver: zodResolver(fragSchema),
    defaultValues: {
      name: data?.result.name,
      description: data?.result.description,
    },
  });

  const onSubmit: SubmitHandler<FragFields> = async (data) => {
    try {
      const updatedFrag = await updateFragByFragId(accessToken!, fragId, data);

      await queryClient.cancelQueries({
        queryKey: ["frag", fragId],
      });

      queryClient.setQueryData(["frag", fragId], updatedFrag);

      setError(null);

      queryClient.invalidateQueries({
        queryKey: ["frags"],
      });
      queryClient.invalidateQueries({
        queryKey: ["frag", fragId],
      });
    } catch (error) {
      if (error instanceof Error) {
        setError({ message: error.message });
      }
    }
  };

  useEffect(() => {
    if (data) {
      setValue("name", data.result.name);
      setValue("description", data.result.description);
    }
  }, [data, setValue]);

  return (
    <LoadingContainer isLoading={isPending} message={"FRAG 정보 불러오는 중"}>
      {isSubmitting && <LoadingModal message={"FRAG 정보 수정 중"} />}
      <form
        className="w-192 flex flex-col items-end gap-6 rounded-2xl bg-slate-900 p-10 shadow-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full items-center justify-between gap-4">
          <label className="grow text-center text-xl font-bold" htmlFor="name">
            FRAG 이름
          </label>
          <input
            className={`${errors?.name ? "border-red-400 focus:border-red-400" : "border-slate-700 focus:border-slate-500"} w-128 overflow-scroll rounded-2xl border-4 bg-slate-800 p-4 placeholder:text-slate-400 focus:outline-0`}
            id={"name"}
            placeholder="2글자 이상, 10글자 이하로 입력해주세요"
            {...register("name")}
          />
        </div>
        {errors?.name && (
          <p className="text-sm text-red-400">
            2글자 이상, 10글자 이하로 입력해주세요
          </p>
        )}
        <hr className="w-full border border-slate-700" />
        <div className="flex w-full items-center justify-between gap-4  ">
          <label
            className="grow text-center text-xl font-bold"
            htmlFor="description"
          >
            FRAG 설명
          </label>
          <textarea
            className={`${errors?.description ? "border-red-400 focus:border-red-400" : "border-slate-700 focus:border-slate-500"} w-128 h-40 resize-none overflow-scroll rounded-2xl border-4 bg-slate-800 p-4 placeholder:text-slate-400 focus:outline-0`}
            id={"description"}
            placeholder="10글자 이상, 100글자 이하로 입력해주세요"
            {...register("description")}
          />
        </div>
        {errors?.description && (
          <p className="text-sm text-red-400">
            10글자 이상, 100글자 이하로 입력해주세요
          </p>
        )}
        <div className="w-128 flex h-12 items-center justify-end gap-4">
          {error?.message && <ErrorMessage message={error.message} />}
          <button
            className="h-12 w-24 rounded-2xl bg-green-400 py-2 text-center font-bold text-slate-900 hover:bg-green-500 disabled:bg-slate-500"
            type="submit"
            disabled={isSubmitting}
          >
            수정하기
          </button>
        </div>
      </form>
    </LoadingContainer>
  );
}
