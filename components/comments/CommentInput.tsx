"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentByPostId } from "@/lib/api";
import useAuth from "@/store/AuthStore";

export default function CommentInput({ postId }: { postId: number }) {
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
        className="h-32 w-full resize-none rounded-2xl border-4 border-slate-800 bg-slate-800 p-4 placeholder:text-slate-400 focus:border-slate-500 focus:outline-0"
        placeholder="댓글을 작성해보세요!"
        value={content}
        onChange={handleChange}
      />
      <button
        className="absolute bottom-4 right-4 w-20 rounded-2xl bg-green-400 py-2 font-bold hover:bg-green-500 disabled:bg-slate-600"
        type="submit"
        disabled={isPending}
      >
        확인
      </button>
    </form>
  );
}
