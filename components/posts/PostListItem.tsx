"use client";

import { Post } from "@prisma/client";
import LikeCount from "@/components/posts/LikeCount";
import CommentCount from "@/components/posts/CommentCount";
import AuthorInfo from "@/components/posts/AuthorInfo";
import { useQuery } from "@tanstack/react-query";
import {
  getCommentsByPostId,
  getLikesByPostId,
  getUserByUserId,
} from "@/lib/api";
import Link from "next/link";
import ViewCount from "@/components/posts/ViewCount";
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
        className="w-1/2 text-white hover:text-green-400"
        href={`/frags/${fragId}/posts/${id}`}
      >
        {title.length > 28 ? title.slice(0, 28) + "..." : title}
      </Link>
      <div className="flex w-1/2 items-center justify-end gap-2">
        <AuthorInfo author={author} />
        <ViewCount view={view} />
        <LikeCount likes={likes} />
        <CommentCount comments={comments} />
      </div>
    </li>
  );
}
