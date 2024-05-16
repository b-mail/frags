"use client";

import { Comment, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getUserByUserId } from "@/lib/api";
import UserBadge from "@/components/ui/UserBadge";
import DateBadge from "@/components/ui/DateBadge";
import TimeBadge from "@/components/ui/TimeBadge";

export default function CommentListItem({ comment }: { comment: Comment }) {
  const { content, userId, createdAt } = comment;

  const { data: author } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: async () => getUserByUserId(userId),
  });

  return (
    <li className="flex flex-col gap-4">
      <hr className="w-full border border-slate-700" />
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <UserBadge
            userName={author?.name ?? "홍길동"}
            enableIcon={true}
            className="bg-slate-800"
          />
        </div>
        <div className="flex gap-2 text-sm">
          <DateBadge
            date={createdAt.toString().slice(0, 10).replaceAll("-", ". ")}
          />
          <TimeBadge time={createdAt.toString().slice(11, 16)} />
        </div>
      </div>
      <div className="px-2">{content}</div>
    </li>
  );
}
