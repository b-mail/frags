"use client";

import { Comment, User } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCommentByCommentId, getUserByUserId } from "@/lib/api";
import UserBadge from "@/components/ui/UserBadge";
import DateBadge from "@/components/ui/DateBadge";
import TimeBadge from "@/components/ui/TimeBadge";
import { ApiResponse } from "@/lib/type";
import { useState } from "react";
import CommentForm from "@/components/comments/CommentForm";
import useAuth from "@/store/AuthStore";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import EditButton from "@/components/ui/EditButton";
import DeleteButton from "@/components/ui/DeleteButton";

export default function CommentListItem({ comment }: { comment: Comment }) {
  const [editMode, setEditMode] = useState(false);

  const user = useAuth.use.user();
  const accessToken = useAuth.use.accessToken();

  const queryClient = useQueryClient();

  const { content, userId, createdAt } = comment;

  const { data: author } = useQuery<ApiResponse<User>>({
    queryKey: ["user", userId],
    queryFn: async () => getUserByUserId(userId),
  });

  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: async () =>
      await deleteCommentByCommentId(accessToken as string, comment.id),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["post", comment.postId, "comments"],
      });

      const prevComments = queryClient.getQueryData<ApiResponse<Comment[]>>([
        "post",
        comment.postId,
        "comments",
      ]);
      queryClient.setQueryData(["post", comment.postId, "comments"], {
        ...prevComments,
        result: prevComments?.result.filter(
          (c: Comment) => c.id !== comment.id,
        ),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", comment.postId, "comments"],
      });
    },
  });

  if (editMode) {
    return (
      <CommentForm
        postId={comment.postId}
        initialValues={comment}
        targetId={comment.id}
        close={() => setEditMode(false)}
      />
    );
  }

  // if (isDeleting) {
  //   return <LoadingIndicator message={"댓글 삭제 중"} noShadow />;
  // }

  return (
    <li className="relative flex flex-col gap-4">
      {isDeleting && (
        <div className="absolute left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-slate-900">
          <LoadingIndicator message={"댓글 삭제 중"} noShadow />
        </div>
      )}
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <UserBadge
            userName={author?.result.name ?? "홍길동"}
            enableIcon={true}
            className="bg-slate-800"
          />
          <DateBadge
            date={createdAt.toString().slice(0, 10).replaceAll("-", ". ")}
          />
          <TimeBadge time={createdAt.toString().slice(11, 16)} />
        </div>
        {user?.id === userId && (
          <div className="flex gap-2">
            <EditButton onClick={() => setEditMode(true)} />
            <DeleteButton onClick={() => deleteComment()} />
          </div>
        )}
      </div>
      <div className="px-2 pb-6">{content}</div>
    </li>
  );
}
