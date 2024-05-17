"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
  getCommentsByPostId,
  getLikesByPostId,
  getPostByPostId,
  getUserByUserId,
} from "@/lib/api";
import { Comment, Like, Post, User } from "@prisma/client";
import LikeBadge from "@/components/ui/LikeBadge";
import CommentBadge from "@/components/posts/CommentBadge";
import UserBadge from "@/components/ui/UserBadge";
import ViewBadge from "@/components/ui/ViewBadge";
import { ApiResponse } from "@/lib/type";
import PulseContainer from "@/components/ui/PulseContainer";

export default function PostListItem({ post }: { post: Post }) {
  const { id, title, userId, fragId, view } = post;

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
        </PulseContainer>
      </div>
    </li>
  );
}
