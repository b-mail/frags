"use client";

import { Comment, User } from "@prisma/client";
import useAuth from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { getUserByUserId } from "@/lib/api";
import AuthorInfo from "@/components/posts/AuthorInfo";

export default function CommentListItem({ comment }: { comment: Comment }) {
  const { content, userId, createdAt } = comment;

  const user = useAuth.use.user();

  const { data: author, isSuccess } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: async () => getUserByUserId(userId),
  });

  return (
    <li className="flex flex-col gap-4">
      <hr className="w-full border border-slate-700" />
      <div className="flex items-start justify-between">
        {isSuccess && (
          <AuthorInfo
            author={author}
            enableIcon={true}
            className="bg-slate-800"
          />
        )}
        <div className="flex gap-2 text-sm">
          <div className=" text-slate-500">
            {createdAt.toString().slice(0, 10).split("-").join(". ")}
          </div>
          <div className=" text-slate-500">
            {createdAt.toString().slice(11, 16)}
          </div>
        </div>
      </div>
      <div className="px-2">{content}</div>
    </li>
  );
}
