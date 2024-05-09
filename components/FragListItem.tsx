"use client";

import { Frag, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getMembersByFragId, getUserById } from "@/lib/api";
import MemberCount from "@/components/MemberCount";

export default function FragListItem({ frag }: { frag: Frag }) {
  const { name, description, adminId } = frag;

  const { data: admin } = useQuery<User>({
    queryKey: ["user", adminId],
    queryFn: async ({ queryKey }) => getUserById(queryKey[1] as number),
  });

  const { data: members, isSuccess: isMemberSuccess } = useQuery<User[]>({
    queryKey: ["frag", frag.id, "members"],
    queryFn: async ({ queryKey }) => getMembersByFragId(queryKey[1] as number),
  });

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-900 p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex w-96 items-end gap-4">
          <div className="text-2xl font-bold">{name}</div>
          {isMemberSuccess && <MemberCount count={members.length} />}
        </div>
        <div className="flex w-96 items-center justify-end">
          <button className="rounded-2xl bg-green-400 px-4 py-2 font-bold hover:bg-green-500">
            가입하기
          </button>
        </div>
      </div>
      <hr className="w-full border border-slate-700" />
      <div
        className="h-20 overflow-hidden break-words break-all rounded-2xl bg-slate-800 p-4 text-slate-500"
        style={{ width: "48rem" }}
      >
        {description.length > 115
          ? description.slice(0, 115) + "..."
          : description}
      </div>
    </div>
  );
}
