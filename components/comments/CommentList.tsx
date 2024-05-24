"use client";

import { getCommentsByPostId } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import CommentListItem from "@/components/comments/CommentListItem";
import LoadingContainer from "@/components/ui/LoadingContainer";
import { ApiResponse } from "@/lib/type";
import { Comment } from "@prisma/client";

export default function CommentList({ postId }: { postId: string }) {
  const { data: comments, isLoading } = useQuery<ApiResponse<Comment[]>>({
    queryKey: ["post", postId, "comments"],
    queryFn: async () => await getCommentsByPostId(postId),
  });

  if (comments && comments.result.length === 0) {
    return (
      <div className="mt-4 flex w-full items-center justify-center text-slate-500">
        댓글이 없습니다. 첫번째 댓글을 달아보세요!
      </div>
    );
  }

  return (
    <LoadingContainer
      isLoading={isLoading}
      message={"댓글 불러오는 중"}
      noShadow={true}
    >
      <ul className="flex w-full flex-col gap-6">
        {comments?.result.map((comment) => (
          <>
            <CommentListItem key={comment.id} comment={comment} />
            <hr className="w-full border border-slate-700" />
          </>
        ))}
      </ul>
    </LoadingContainer>
  );
}
