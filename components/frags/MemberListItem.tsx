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
import LoadingModal from "@/components/ui/LoadingModal";

export default function MemberListItem({
  member,
  fragId,
}: {
  member: User;
  fragId: string;
}) {
  const { id, name } = member;

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

      queryClient
        .invalidateQueries({
          queryKey: ["frag", fragId, "members"],
        })
        .then();
    },
  });

  return (
    <li className="flex min-h-[40px] flex-col justify-between gap-2 border-b border-slate-800 py-3 last:border-0 md:flex-row md:items-center md:py-2">
      {isPending && <LoadingModal message={"멤버 추방 중"} />}
      <div className="flex-1 text-base font-bold text-white md:mr-4">{name}</div>
      <div className="flex w-full items-center justify-end gap-3 text-xs md:w-auto md:gap-2 md:text-sm">
        <PulseContainer
          isLoading={
            !accessToken || isLoadingPosts || isLoadingComments || isLoadingLikes
          }
        >
          <div className="flex items-center gap-3 md:gap-2">
            <PostBadge count={posts?.result.length!} />
            <CommentBadge count={comments?.result.length!} />
            <LikeBadge count={likes?.result.length!} />
          </div>
          {isAdmin ? (
            <div className="flex items-center justify-center rounded-xl bg-slate-800 px-3 py-2 text-slate-400">
              관리자
            </div>
          ) : (
            <button
              className="rounded-xl bg-slate-800 px-3 py-2 text-red-400 hover:bg-slate-700"
              onClick={() => mutate()}
              disabled={isPending}
            >
              추방
            </button>
          )}
        </PulseContainer>
      </div>
    </li>
  );
}
