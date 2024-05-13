"use client";

import { Frag, User } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { joinFragByFragId, getUsersByFragId, getUserByUserId } from "@/lib/api";
import MemberCount from "@/components/frags/MemberCount";
import { useEffect, useState } from "react";
import useAuth from "@/store/AuthStore";
import Link from "next/link";

export default function FragListItem({ frag }: { frag: Frag }) {
  const { id, name, description, adminId } = frag;
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const user = useAuth.use.user();
  const accessToken = useAuth.use.accessToken();

  const queryClient = useQueryClient();

  const { data, isSuccess: isMemberSuccess } = useQuery<{
    result: User[];
  }>({
    queryKey: ["frag", frag.id, "members"],
    queryFn: async ({ queryKey }) => getUsersByFragId(queryKey[1] as number),
    staleTime: 1000 * 60 * 10,
  });

  const { mutate } = useMutation({
    mutationFn: async () =>
      await joinFragByFragId(accessToken as string, frag.id),
    onSuccess: () => {
      setIsMember(true);
      queryClient.invalidateQueries({
        queryKey: ["frag", frag.id, "members"],
      });
    },
  });

  useEffect(() => {
    setIsAdmin(user?.id === adminId);
    if (isMemberSuccess) {
      setIsMember(data.result.some((member) => user?.id === member.id));
    }
  }, [data, isMemberSuccess, adminId]);

  return (
    <li className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-900 p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex w-96 items-end gap-4">
          <Link href={`/frags/${id}/posts`} className="text-2xl font-bold">
            {name}
          </Link>
          {isMemberSuccess && <MemberCount count={data.result.length} />}
        </div>
        <div className="flex w-96 items-center justify-end">
          <button
            className="rounded-2xl bg-green-400 px-4 py-2 font-bold hover:bg-green-500 disabled:bg-slate-800 disabled:hover:bg-slate-800"
            onClick={() => mutate()}
            disabled={isMember || isAdmin}
          >
            {isMember ? (isAdmin ? "관리자" : "가입됨") : "가입하기"}
          </button>
        </div>
      </div>
      <hr className="w-full border border-slate-700" />
      <div
        className="rounded-2xl bg-slate-800 p-4 text-slate-500"
        style={{ width: "48rem" }}
      >
        <p className="line-clamp-2 h-12 text-slate-400">{description}</p>
      </div>
    </li>
  );
}
