"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentByPostId } from "@/lib/api";
import useAuth from "@/store/AuthStore";
import LoadingContainer from "@/components/ui/LoadingContainer";

export default function CommentForm({ postId }: { postId: number }) {
  const [content, setContent] = useState("");

  const accessToken = useAuth.use.accessToken();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      await createCommentByPostId(accessToken as string, postId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", postId, "comments"],
      });
      setContent("");
    },
  });

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <form
      className="relative flex w-full flex-col items-end justify-center gap-2"
      onSubmit={handleSubmit}
    >
      <textarea
        className="h-28 w-full resize-none rounded-2xl border-4 border-slate-700 bg-slate-800 p-4 placeholder:text-slate-400 focus:border-slate-500 focus:outline-0"
        placeholder="댓글을 작성해보세요!"
        value={content}
        onChange={handleChange}
      />
      <div className="flex h-12 items-center justify-end">
        <LoadingContainer
          isLoading={isPending}
          message={"댓글 업로드 중"}
          noShadow={true}
        >
          <button
            className=" w-20 rounded-2xl bg-green-400 py-2 font-bold hover:bg-green-500 disabled:bg-slate-600"
            type="submit"
            disabled={isPending}
          >
            확인
          </button>
        </LoadingContainer>
      </div>
    </form>
  );
}
