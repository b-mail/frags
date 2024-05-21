"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
  deletePostByPostId,
  getCommentsByPostId,
  getLikesByPostId,
  getUserByUserId,
} from "@/lib/api";
import { Comment, Like, Post, User } from "@prisma/client";
import LikeBadge from "@/components/ui/LikeBadge";
import CommentBadge from "@/components/posts/CommentBadge";
import UserBadge from "@/components/ui/UserBadge";
import ViewBadge from "@/components/ui/ViewBadge";
import { ApiResponse } from "@/lib/type";
import PulseContainer from "@/components/ui/PulseContainer";
import { useEffect } from "react";
import DeleteButton from "@/components/ui/DeleteButton";
import useAuth from "@/store/AuthStore";
import LoadingModal from "@/components/ui/LoadingModal";

export default function PostListItem({
  post,
  isAdmin = false,
}: {
  post: Post;
  isAdmin?: boolean;
}) {
  const { id, title, userId, fragId, view } = post;

  const queryClient = useQueryClient();
  const accessToken = useAuth.use.accessToken();

  const { data: author } = useQuery<ApiResponse<User>>({
    queryKey: ["user", userId],
    queryFn: async () => await getUserByUserId(userId),
  });

  const { data: likes } = useQuery<ApiResponse<Like[]>>({
    queryKey: ["post", id, "likes"],
    queryFn: async () => await getLikesByPostId(id),
    staleTime: 1000 * 60 * 5,
  });

  const { data: comments } = useQuery<ApiResponse<Comment[]>>({
    queryKey: ["post", id, "comments"],
    queryFn: async () => await getCommentsByPostId(id),
    staleTime: 1000 * 60 * 5,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => await deletePostByPostId(accessToken!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["frag", fragId, "posts"] });
    },
  });

  useEffect(() => {
    queryClient.setQueryData(["post", id], { result: { ...post } });
  }, []);

  return (
    <li className="flex h-10 items-center justify-between">
      <Link
        className="line-clamp-1 w-80 text-white hover:text-green-400"
        href={`/frags/${fragId}/posts/${id}`}
      >
        {title}
      </Link>
      <div className="flex h-full w-1/2 items-center justify-end gap-2">
        <PulseContainer isLoading={!author || !likes || !comments}>
          <UserBadge userName={author?.result.name ?? "홍길동"} />
          <ViewBadge view={view} />
          <LikeBadge count={likes?.result.length ?? 0} />
          <CommentBadge count={comments?.result.length ?? 0} />
          {isAdmin && (
            <DeleteButton onClick={() => mutate()} disabled={isPending} />
          )}
          {isPending && <LoadingModal message={"게시글 삭제 중"} />}
        </PulseContainer>
      </div>
    </li>
  );
}
