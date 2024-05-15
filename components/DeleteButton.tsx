"use client";

import useAuth from "@/store/AuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentByCommentId, deletePostByPostId } from "@/lib/api";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import LoadingModal from "@/components/LoadingModal";

export default function DeleteButton({
  id,
  fragId,
  type,
  author,
}: {
  id: number;
  fragId?: number;
  type: "post" | "comment";
  author: User | null;
}) {
  const accessToken = useAuth.use.accessToken();
  const user = useAuth.use.user();

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      switch (type) {
        case "post":
          await deletePostByPostId(accessToken as string, id);
          break;
        case "comment":
          await deleteCommentByCommentId(accessToken as string, id);
          break;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          if (type === "post") {
            return query.queryKey[2] === "posts";
          }
          return query.queryKey[2] === "comments";
        },
      });
      if (type === "post") {
        router.push(`/frags/${fragId}/posts`);
      }
    },
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    mutate(id);
  };

  if (user?.id !== author?.id) {
    return null;
  }

  return (
    <button
      className="rounded-lg bg-slate-800 px-4 py-2 text-white"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending && (
        <LoadingModal
          message={`${type === "post" ? "게시글" : "댓글"} 삭제 중`}
        />
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5 stroke-slate-400 hover:stroke-red-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    </button>
  );
}
