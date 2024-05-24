"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getFragByFragId, getUsersByFragId } from "@/lib/api";
import MemberList from "@/components/posts/MemberList";
import { Frag, User } from "@prisma/client";
import { ApiResponse } from "@/lib/type";
import useAuth from "@/store/AuthStore";

export default function PostSideBar({ fragId }: { fragId: string }) {
  const [isActive, setIsActive] = useState(false);

  const user = useAuth.use.user();

  const pathname = usePathname();

  const { data: frag, isPending } = useQuery<ApiResponse<Frag>>({
    queryKey: ["frag", fragId],
    queryFn: async () => await getFragByFragId(fragId),
  });

  const { data: members, isSuccess: isMemberSuccess } = useQuery<
    ApiResponse<User[]>
  >({
    queryKey: ["frag", fragId, "members"],
    queryFn: async () => await getUsersByFragId(fragId),
  });

  const toggleActive = () => setIsActive(!isActive);

  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  return isPending ? null : (
    <div
      className={`${isActive ? "left-0" : "-left-60"} fixed top-24 flex transition-all duration-500`}
    >
      <div className="flex w-60 flex-col items-center gap-6 rounded-r-2xl bg-slate-900 p-6 shadow-2xl">
        <Link className="text-2xl font-bold" href={`/frags/${fragId}/posts`}>
          {frag?.result.name ?? ""}
        </Link>
        <div className="flex w-full items-center justify-center gap-2">
          <Link
            className="w-full grow rounded-2xl bg-green-400 py-2 text-center font-bold text-slate-900 hover:bg-green-500"
            href={`/frags/${fragId}/new`}
          >
            새 글 작성하기
          </Link>
          {frag?.result.adminId === user?.id && (
            <Link
              className="flex items-center justify-center gap-1 rounded-2xl bg-slate-800 p-2 text-center font-bold text-slate-400 hover:bg-slate-700 hover:text-green-400"
              href={`/frags/${fragId}/manage`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 stroke-slate-400 hover:stroke-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Link>
          )}
        </div>
        <hr className="w-full border border-slate-700" />
        {isMemberSuccess && <MemberList members={members.result} />}
      </div>
      <button
        className="top-32 mt-10 h-24 w-8 rounded-r-lg bg-slate-900 shadow-2xl"
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
    </div>
  );
}
