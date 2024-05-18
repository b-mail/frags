"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  unlikePostByPostId,
  getLikesByPostId,
  likePostByPostId,
} from "@/lib/api";
import { Like } from "@prisma/client";
import { MouseEventHandler, useEffect, useState } from "react";
import useAuth from "@/store/AuthStore";
import { ApiResponse } from "@/lib/type";

export default function LikeButton({ postId }: { postId: number }) {
  const [isActive, setIsActive] = useState(false);

  const user = useAuth.use.user();
  const accessToken = useAuth.use.accessToken();
  const queryClient = useQueryClient();

  const { data: likes, isSuccess } = useQuery<ApiResponse<Like[]>>({
    queryKey: ["post", postId, "likes"],
    queryFn: async () => await getLikesByPostId(postId),
  });

  const { mutate: like, isPending: isLikePending } = useMutation({
    mutationFn: async () => await likePostByPostId(accessToken!, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", postId, "likes"],
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["post", postId, "likes"] });

      const prevLikes = queryClient.getQueryData<ApiResponse<Like[]>>([
        "post",
        postId,
        "likes",
      ]);

      queryClient.setQueryData(["post", postId, "likes"], {
        ...prevLikes,
        result: [...prevLikes!.result, { userId: user?.id, postId }],
      });
    },
  });

  const { mutate: unlike, isPending: isUnlikePending } = useMutation({
    mutationFn: async () => await unlikePostByPostId(accessToken!, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", postId, "likes"],
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["post", postId, "likes"] });

      const prevLikes = queryClient.getQueryData<ApiResponse<Like[]>>([
        "post",
        postId,
        "likes",
      ]);

      queryClient.setQueryData(["post", postId, "likes"], {
        ...prevLikes,
        result: [...prevLikes!.result].slice(0, prevLikes!.result.length - 1),
      });
    },
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (isActive) {
      setIsActive(false);
      unlike();
    } else {
      setIsActive(true);
      like();
    }
  };

  useEffect(() => {
    setIsActive(
      likes?.result?.some((like) => like.userId === user?.id) ?? false,
    );
  }, [likes, user]);

  return (
    <button
      className="flex h-16 w-24 items-center justify-center gap-2 rounded-2xl bg-slate-800 p-4 hover:bg-slate-700 disabled:hover:bg-slate-800"
      onClick={handleClick}
      disabled={!isSuccess || isLikePending || isUnlikePending}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`h-6 w-6  ${isActive ? "fill-green-400 stroke-0" : "stroke-slate-400 stroke-2"}`}
      >
        {isActive ? (
          <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
          />
        )}
      </svg>
      <span className="text-xl font-bold text-slate-400">
        {likes?.result?.length ?? 0}
      </span>
    </button>
  );
}
