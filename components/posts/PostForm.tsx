"use client";

import { useState } from "react";
import useAuth from "@/store/AuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/api";
import Link from "next/link";
import LoadingModal from "@/components/ui/LoadingModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostFields, postSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function PostForm({
  fragId,
  initialValues = { title: "", content: "" },
}: {
  fragId: number;
  initialValues?: { title: string; content: string };
}) {
  const [error, setError] = useState<{ message: string }>({
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
  } = useForm<PostFields>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit: SubmitHandler<PostFields> = async (data) => {
    try {
      await createPost(accessToken!, fragId, data);
      queryClient.invalidateQueries({ queryKey: ["frag", fragId, "posts"] });
      router.push(`/frags/${fragId}/posts`);
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
      {isSubmitting && <LoadingModal message={"게시글 업로드 중"} />}
      <label className="text-xl font-bold" htmlFor="title">
        제목
        <span
          className={`ml-2 text-sm font-medium ${watch("title")?.length > 20 ? "text-red-400" : "text-slate-500"}`}
        >
          {watch("title")?.length ?? 0} / 20
        </span>
      </label>
      <input
        className={`${errors?.title ? "border-red-400 focus:border-red-400" : "border-slate-700 focus:border-slate-500"} overflow-scroll rounded-2xl border-4 bg-slate-800 p-4 placeholder:text-slate-400 focus:outline-0`}
        style={{ width: "32rem" }}
        id={"title"}
        placeholder="제목을 입력해주세요."
        {...register("title")}
      />
      {errors.title && (
        <div className="text-sm text-red-400">{errors.title.message}</div>
      )}
      <hr className="border border-slate-700" />
      <label className="text-xl font-bold" htmlFor="content">
        본문
        <span
          className={`ml-2 text-sm font-medium ${watch("content")?.length > 500 ? "text-red-400" : "text-slate-500"}`}
        >
          {watch("content")?.length ?? 0} / 500
        </span>
      </label>
      <textarea
        className={`${errors?.content ? "border-red-400 focus:border-red-400" : "border-slate-700 focus:border-slate-500"} h-96 resize-none overflow-scroll rounded-2xl border-4 bg-slate-800 p-4 placeholder:text-slate-400 focus:outline-0`}
        id={"content"}
        placeholder="본문을 입력해주세요."
        {...register("content")}
      />
      {errors.content && (
        <div className="text-sm text-red-400">{errors.content.message}</div>
      )}
      <div className="flex w-full items-center justify-end gap-4">
        <div className="grow">
          {error.message && <ErrorMessage message={error.message} />}
        </div>
        <Link
          className="flex h-12 w-14 items-center justify-center rounded-2xl bg-slate-800 text-center text-slate-400 hover:text-red-400"
          href={`/frags/${fragId}/posts`}
        >
          취소
        </Link>
        <button
          className="h-12 w-24 rounded-2xl bg-green-400 font-bold hover:bg-green-500 disabled:bg-slate-500"
          type={"submit"}
          disabled={isSubmitting}
        >
          확인
        </button>
      </div>
    </form>
  );
}
