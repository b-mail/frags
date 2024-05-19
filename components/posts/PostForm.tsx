"use client";

import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { createPost, updatePostByPostId } from "@/lib/api";
import { PostFields, postSchema } from "@/lib/schema";
import useAuth from "@/store/AuthStore";
import LoadingModal from "@/components/ui/LoadingModal";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { ApiResponse } from "@/lib/type";
import { Post } from "@prisma/client";

export default function PostForm({
  fragId,
  initialValues = { title: "", content: "" },
  targetId,
  close,
}: {
  fragId: number;
  initialValues?: PostFields;
  targetId?: number;
  close?: () => void;
}) {
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
  } = useForm<PostFields>({
    resolver: zodResolver(postSchema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<PostFields> = async (data) => {
    try {
      if (targetId && close) {
        const updatedPost: ApiResponse<Post> = await updatePostByPostId(
          accessToken!,
          targetId,
          data,
        );

        await queryClient.cancelQueries({
          queryKey: ["post", targetId],
        });

        const prevPost = queryClient.getQueryData<ApiResponse<Post>>([
          "post",
          targetId,
        ]);

        queryClient.setQueryData(["post", targetId], {
          ...prevPost,
          result: updatedPost.result,
        });

        queryClient.invalidateQueries({ queryKey: ["post", targetId] });
        close();
      } else {
        const newPost: ApiResponse<Post> = await createPost(
          accessToken!,
          fragId,
          data,
        );

        await queryClient.cancelQueries({
          queryKey: ["frag", fragId, "posts"],
          exact: false,
        });

        const prevPosts: any = queryClient.getQueryData([
          "frag",
          fragId,
          "posts",
          "",
          "latest",
        ]);

        queryClient.setQueryData(["frag", fragId, "posts", "", "latest"], {
          ...prevPosts,
          pages: [{ result: [newPost?.result] }, ...prevPosts!.pages],
        });

        queryClient.invalidateQueries({ queryKey: ["frag", fragId, "posts"] });
        router.push(`/frags/${fragId}/posts`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = () => {
    if (targetId && close) {
      close();
    } else {
      router.push(`/frags/${fragId}/posts`);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isSubmitting && (
        <LoadingModal
          message={targetId ? "게시글 수정 중" : "게시글 업로드 중"}
        />
      )}
      <label className="text-xl font-bold" htmlFor="title">
        제목
        <span
          className={`ml-2 text-sm font-medium ${watch("title")?.length > 20 ? "text-red-400" : "text-slate-500"}`}
        >
          {watch("title")?.length ?? 0} / 20
        </span>
      </label>
      <input
        className={`${errors?.title ? "border-red-400 focus:border-red-400" : "border-slate-700 focus:border-slate-500"} w-128 overflow-scroll rounded-2xl border-4 bg-slate-800 p-4 placeholder:text-slate-400 focus:outline-0`}
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
        <button
          className="flex h-12 w-14 items-center justify-center rounded-2xl bg-slate-800 text-center text-slate-400 hover:text-red-400"
          onClick={handleCancel}
        >
          취소
        </button>
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
