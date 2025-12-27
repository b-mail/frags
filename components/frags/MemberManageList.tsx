"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/lib/type";
import { User } from "@prisma/client";
import { getUsersByFragId } from "@/lib/api";
import LoadingContainer from "@/components/ui/LoadingContainer";
import MemberListItem from "@/components/frags/MemberListItem";

export default function MemberManageList({ fragId }: { fragId: string }) {
  const { data: member, isPending } = useQuery<ApiResponse<User[]>>({
    queryKey: ["frag", fragId, "members"],
    queryFn: async () => await getUsersByFragId(fragId),
  });

  return (
    <LoadingContainer isLoading={isPending} message={"멤버 목록 불러오는 중"}>
      <ul className="flex w-full flex-col gap-4 rounded-2xl bg-slate-900 p-6 shadow-2xl">
        {member?.result.map((user) => (
          <MemberListItem key={user.id} member={user} fragId={fragId} />
        ))}
      </ul>
    </LoadingContainer>
  );
}
