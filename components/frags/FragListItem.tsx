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
    <li className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-900 p-6 shadow-2xl">
      {isPending && <LoadingModal message={"가입 중"} />}
      <div className="flex h-12 items-center justify-between">
        <div className="flex w-96 items-center justify-start gap-4">
          <Link
            href={`/frags/${id}/posts`}
            className="text-2xl font-bold hover:text-green-400"
          >
            {name}
          </Link>
          <MemberBadge count={data?.result.length || 0} />
        </div>
        <div className="flex w-96 items-center justify-end gap-4">
          <PulseContainer isLoading={isLoading}>
            {isMember && (
              <Link
                className="rounded-2xl bg-green-400 px-4 py-2 font-bold text-slate-900 hover:bg-green-500"
                href={`/frags/${id}/posts`}
              >
                입장하기
              </Link>
            )}
            <button
              className="rounded-2xl bg-green-400 px-4 py-2 font-bold text-slate-900 hover:bg-green-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:hover:bg-slate-800"
              onClick={() => mutate()}
              disabled={isAdmin || isMember}
            >
              {isAdmin ? "관리자" : isMember ? "가입됨" : "가입하기"}
            </button>
          </PulseContainer>
        </div>
      </div>
      <hr className="w-full border border-slate-700" />
      <div className="w-192 rounded-2xl bg-slate-800 p-4 text-slate-500 ">
        <p className="line-clamp-2 h-12 text-slate-400">{description}</p>
      </div>
    </li>
  );
}
