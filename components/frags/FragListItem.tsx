"use client";

import { Frag, User } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { joinFragByFragId, getUsersByFragId } from "@/lib/api";
import MemberBadge from "@/components/frags/MemberBadge";
import { useMemo } from "react";
import useAuth from "@/store/AuthStore";
import Link from "next/link";
import LoadingModal from "@/components/ui/LoadingModal";
import { ApiResponse } from "@/lib/type";
import PulseContainer from "@/components/ui/PulseContainer";

export default function FragListItem({ frag }: { frag: Frag }) {
  const { id, name, description, adminId } = frag;

  const user = useAuth.use.user();
  const accessToken = useAuth.use.accessToken();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<ApiResponse<User[]>>({
    queryKey: ["frag", frag.id, "members"],
    queryFn: async () => await getUsersByFragId(frag.id),
    staleTime: 1000 * 60 * 10,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => await joinFragByFragId(accessToken!, frag.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["frag", frag.id, "members"],
      });
    },
  });

  const isAdmin = useMemo(() => user?.id === adminId, [user?.id, adminId]);
  const isMember = useMemo(
    () => data?.result.some((member) => member.id === user?.id),
    [data?.result, user?.id],
  );

  return (
    <li className="flex flex-col justify-between gap-4 rounded-2xl bg-slate-900 p-6 shadow-2xl transition-transform hover:scale-[1.02]">
      {isPending && <LoadingModal message={"가입 중"} />}
      
      <div className="flex flex-col gap-3">
        <div className="flex w-full items-center justify-between gap-2">
          <Link
            href={`/frags/${id}/posts`}
            className="truncate text-xl font-bold hover:text-green-400"
          >
            {name}
          </Link>
          <MemberBadge count={data?.result.length || 0} />
        </div>
        <hr className="w-full border-slate-700" />
      </div>

      <div className="flex-1 rounded-xl bg-slate-800 p-4 text-slate-500">
        <p className="line-clamp-3 text-sm text-slate-400 md:text-base">
          {description}
        </p>
      </div>

      <div className="flex w-full items-center justify-end">
        <PulseContainer isLoading={isLoading}>
          <div className="flex gap-2">
            {isMember && (
              <Link
                className="rounded-xl bg-green-400 px-3 py-2 text-sm font-bold text-slate-900 hover:bg-green-500 md:px-4 md:text-base"
                href={`/frags/${id}/posts`}
              >
                입장하기
              </Link>
            )}
            <button
              className="rounded-xl bg-green-400 px-3 py-2 text-sm font-bold text-slate-900 hover:bg-green-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:hover:bg-slate-800 md:px-4 md:text-base"
              onClick={() => mutate()}
              disabled={isAdmin || isMember}
            >
              {isAdmin ? "관리자" : isMember ? "가입됨" : "가입하기"}
            </button>
          </div>
        </PulseContainer>
      </div>
    </li>
  );
}