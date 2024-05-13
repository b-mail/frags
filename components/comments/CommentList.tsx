"use client";

import { getCommentsByPostId } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import CommentListItem from "@/components/comments/CommentListItem";
import { Comment } from "@prisma/client";

export default function CommentList({ postId }: { postId: number }) {
  const { data: comments } = useQuery<Comment[]>({
    queryKey: ["post", postId, "comments"],
    queryFn: async () => await getCommentsByPostId(postId),
  });

  return (
    <ul className="flex w-full flex-col gap-6">
      {comments?.map((comment) => (
        <CommentListItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
