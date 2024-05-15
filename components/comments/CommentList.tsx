"use client";

import { getCommentsByPostId } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import CommentListItem from "@/components/comments/CommentListItem";
import { Comment } from "@prisma/client";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function CommentList({ postId }: { postId: number }) {
  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ["post", postId, "comments"],
    queryFn: async () => await getCommentsByPostId(postId),
  });

  if (comments && comments.length === 0) {
    return (
      <div className="mt-4 flex w-full items-center justify-center text-slate-500">
        댓글이 없습니다. 첫번째 댓글을 달아보세요!
      </div>
    );
  }

  return (
    <ul className="flex w-full flex-col gap-6">
      {isLoading ? (
        <LoadingIndicator message={"댓글을 불러오는 중"} noShadow={true} />
      ) : (
        comments?.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))
      )}
    </ul>
  );
}
