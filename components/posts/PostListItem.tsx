"use client";

import { Post } from "@prisma/client";
import LikeBadge from "@/components/ui/LikeBadge";
import CommentBadge from "@/components/posts/CommentBadge";
import UserBadge from "@/components/ui/UserBadge";
import { useQuery } from "@tanstack/react-query";
import {
  getCommentsByPostId,
  getLikesByPostId,
  getUserByUserId,
} from "@/lib/api";
import Link from "next/link";
import ViewBadge from "@/components/ui/ViewBadge";
import { Suspense } from "react";

export default function PostListItem({ post }: { post: Post }) {
  const { id, title, content, userId, fragId, view, createdAt } = post;

  const { data: author } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await getUserByUserId(userId),
  });

  const { data: likes } = useQuery({
    queryKey: ["post", id, "likes"],
    queryFn: async () => await getLikesByPostId(id),
    staleTime: 1000 * 60 * 5,
  });

  const { data: comments } = useQuery({
    queryKey: ["post", id, "comments"],
    queryFn: async () => await getCommentsByPostId(id),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <li className="flex items-center justify-between ">
      <Link
        className="line-clamp-1 w-80 text-white hover:text-green-400"
        href={`/frags/${fragId}/posts/${id}`}
      >
        {title}
      </Link>
      <div className="flex w-96 items-center justify-end gap-2">
        <UserBadge user={author} />
        <ViewBadge view={view} />
        <LikeBadge likes={likes} />
        <CommentBadge comments={comments} />
      </div>
    </li>
  );
}
