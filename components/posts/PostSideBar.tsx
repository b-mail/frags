"use client";

import { useQuery } from "@tanstack/react-query";
import { getFragByFragId, getUsersByFragId } from "@/lib/api";
import useAuth from "@/store/AuthStore";
import Link from "next/link";
import { Suspense, useState } from "react";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import MemberList from "@/components/posts/MemberList";
import { User } from "@prisma/client";

export default function PostSideBar({ fragId }: { fragId: string }) {
  const id = Number(fragId);
  const [isActive, setIsActive] = useState(false);

  const accessToken = useAuth.use.accessToken();

  const { data: frag } = useQuery({
    queryKey: ["frag", id],
    queryFn: async () => await getFragByFragId(id),
  });

  const { data: members, isSuccess: isMemberSuccess } = useQuery<{
    result: User[];
  }>({
    queryKey: ["frag", id, "members"],
    queryFn: async () => await getUsersByFragId(id),
  });

  const toggleActive = () => setIsActive(!isActive);

  return (
    <>
      <div
        className={`${isActive ? "left-0" : "-left-60"} fixed  top-24 flex w-60 flex-col items-center gap-6 rounded-r-2xl bg-slate-900 p-6 shadow-2xl transition-all`}
      >
        <h1 className="text-2xl font-bold">{frag?.name ?? ""}</h1>
        <Link
          className="w-full rounded-2xl bg-green-400 py-2 text-center font-bold hover:bg-green-500"
          href={`/frags/${id}/new`}
        >
          새 글 작성하기
        </Link>
        <hr className="w-full border border-slate-700" />
        {isMemberSuccess && (
          <Suspense
            fallback={<LoadingIndicator message={"멤버 목록 불러오는 중"} />}
          >
            <MemberList members={members.result} />
          </Suspense>
        )}
      </div>
      <button
        className={`${isActive ? "left-60" : "left-0"} fixed top-32 h-24 w-8 rounded-r-lg bg-slate-900 shadow-2xl transition-all`}
        onClick={toggleActive}
      >
        {isActive ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 stroke-slate-500 hover:stroke-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 stroke-slate-500 hover:stroke-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        )}
      </button>
    </>
  );
}
