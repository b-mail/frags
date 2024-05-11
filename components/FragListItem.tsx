"use client";

import { Frag, User } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { joinFragByFragId, getUsersByFragId, getUserByUserId } from "@/lib/api";
import MemberCount from "@/components/MemberCount";
import { useEffect, useState } from "react";
import useAuth from "@/store/AuthStore";

export default function FragListItem({ frag }: { frag: Frag }) {
  const { name, description, adminId } = frag;
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
  });

  const { mutate } = useMutation({
    mutationFn: async () => joinFragByFragId(accessToken as string, frag.id),
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
    <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-900 p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex w-96 items-end gap-4">
          <div className="text-2xl font-bold">{name}</div>
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
