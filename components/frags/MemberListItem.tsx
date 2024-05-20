"use client";

import { Like, Post, User } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "@/lib/type";
import {
  excludeUserByFragIdAndUserId,
  getCommentsByFragIdAndUserId,
  getFragByFragId,
  getLikesByFragIdAndUserId,
  getPostsByFragIdAndUserId,
} from "@/lib/api";
import useAuth from "@/store/AuthStore";
import PostBadge from "@/components/ui/PostBadge";
import PulseContainer from "@/components/ui/PulseContainer";
import CommentBadge from "@/components/posts/CommentBadge";
import LikeBadge from "@/components/ui/LikeBadge";
import { useMemo } from "react";
import LoadingModal from "@/components/ui/LoadingModal";

export default function MemberListItem({
  member,
  fragId,
}: {
  member: User;
  fragId: number;
}) {
  const { id, name } = member;

  const user = useAuth.use.user();
  const accessToken = useAuth.use.accessToken();

  const queryClient = useQueryClient();

  const { data: frag } = useQuery({
    queryKey: ["frag", fragId],
    queryFn: async () => await getFragByFragId(fragId),
  });

  const { data: posts, isLoading: isLoadingPosts } = useQuery<
    ApiResponse<Post[]>
  >({
    queryKey: ["frag", fragId, "member", id, "posts"],
    queryFn: async () =>
      await getPostsByFragIdAndUserId(accessToken!, fragId, id),
    enabled: !!accessToken,
  });

  const { data: comments, isLoading: isLoadingComments } = useQuery<
    ApiResponse<Comment[]>
  >({
    queryKey: ["frag", fragId, "member", id, "comments"],
    queryFn: async () =>
      await getCommentsByFragIdAndUserId(accessToken!, fragId, id),
    enabled: !!accessToken,
  });

  const { data: likes, isLoading: isLoadingLikes } = useQuery<
    ApiResponse<Like[]>
  >({
    queryKey: ["frag", fragId, "member", id, "likes"],
    queryFn: async () =>
      await getLikesByFragIdAndUserId(accessToken!, fragId, id),
    enabled: !!accessToken,
  });

  const isAdmin = id === frag?.result.adminId;

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      await excludeUserByFragIdAndUserId(accessToken!, fragId, id),
    onSuccess: async () => {
      await queryClient.cancelQueries({
        queryKey: ["frag", fragId, "members"],
      });
      const prevMembers = queryClient.getQueryData<ApiResponse<User[]>>([
        "frag",
        fragId,
        "members",
      ]);

      queryClient.setQueryData(["frag", fragId, "members"], {
        ...prevMembers,
        result: [...prevMembers!.result.filter((member) => member.id !== id)],
      });

      queryClient.invalidateQueries({
        queryKey: ["frag", fragId, "members"],
      });
    },
  });

  return (
    <li className="flex h-10 items-center justify-between">
      {isPending && <LoadingModal message={"멤버 추방 중"} />}
      <div className="w-80 font-bold">{name}</div>
      <PulseContainer
        isLoading={
          !accessToken || isLoadingPosts || isLoadingComments || isLoadingLikes
        }
      >
        <div className="flex w-80 justify-between">
          <div className="flex items-center justify-start gap-2">
            <PostBadge count={posts?.result.length!} />
            <CommentBadge count={comments?.result.length!} />
            <LikeBadge count={likes?.result.length!} />
          </div>
          {isAdmin ? (
            <div className="flex w-16 items-center justify-center rounded-xl bg-slate-800 p-2 text-slate-400">
              관리자
            </div>
          ) : (
            <button
              className="w-16 rounded-xl bg-slate-800 p-2 text-red-400 hover:bg-slate-700"
              onClick={() => mutate()}
              disabled={isPending}
            >
              추방
            </button>
          )}
        </div>
      </PulseContainer>
    </li>
  );
}
