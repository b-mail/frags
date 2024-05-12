import { User } from "@prisma/client";

export default function AuthorInfo({ author }: { author: User }) {
  return (
    <div className="flex items-center justify-between gap-1 rounded-lg  p-2">
      <div className="text-sm text-slate-400">{author?.name}</div>
    </div>
  );
}
