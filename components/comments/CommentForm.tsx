"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createCommentByPostId } from "@/lib/api";
import useAuth from "@/store/AuthStore";
import LoadingContainer from "@/components/ui/LoadingContainer";
import { SubmitHandler, useForm } from "react-hook-form";
import { CommentFields, commentSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function CommentForm({ postId }: { postId: number }) {
  const [error, setError] = useState({
    message: "",
  });
  const accessToken = useAuth.use.accessToken();

  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CommentFields>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit: SubmitHandler<CommentFields> = async (data) => {
    try {
      await createCommentByPostId(accessToken!, postId, data);
      queryClient.invalidateQueries({ queryKey: ["post", postId, "comments"] });
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  return (
    <form
      className="relative flex w-full flex-col items-end justify-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <textarea
        className="h-28 w-full resize-none rounded-2xl border-4 border-slate-700 bg-slate-800 p-4 placeholder:text-slate-400 focus:border-slate-500 focus:outline-0"
        placeholder="댓글을 작성해보세요!"
        {...register("content")}
      />
      <span
        className={`${watch("content")?.length > 100 ? "text-red-400" : "text-slate-500"} absolute right-4 text-sm`}
      >
        {watch("content")?.length ?? 0} / 100
      </span>
      <div className="flex h-12 w-full items-center justify-end gap-10">
        {errors.content && (
          <div className="grow text-sm text-red-400">
            {errors.content.message}
          </div>
        )}
        <LoadingContainer
          isLoading={isSubmitting}
          message={"댓글 업로드 중"}
          noShadow={true}
        >
          <button
            className="w-20 rounded-2xl bg-green-400 py-2 font-bold hover:bg-green-500 disabled:bg-slate-600"
            type="submit"
            disabled={!accessToken || isSubmitting}
          >
            확인
          </button>
        </LoadingContainer>
      </div>
    </form>
  );
}
