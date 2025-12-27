"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/lib/type";
import { Frag } from "@prisma/client";
import { getFragByFragId } from "@/lib/api";
import { useEffect } from "react";
import useAuth from "@/store/AuthStore";

export default function FragManageBar({ fragId }: { fragId: string }) {
  const user = useAuth.use.user();

  const pathname = usePathname();
  const router = useRouter();

  const { data } = useQuery<ApiResponse<Frag>>({
    queryKey: ["frag", fragId],
    queryFn: async () => await getFragByFragId(fragId),
  });

  useEffect(() => {
    if (user && data && data.result.adminId !== user.id) {
      router.push(`/frags/${fragId}/posts`);
    }
  }, [fragId, router, data, user]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-2xl bg-slate-900 p-6 shadow-2xl md:flex-row md:gap-10 md:px-10">
      <h2 className="text-xl font-bold">FRAG 관리</h2>
      <hr className="w-full border-slate-800 md:hidden" />
      <div className="grid w-full grid-cols-2 gap-2 text-center text-sm md:flex md:w-auto md:gap-4 md:text-base">
        <Link
          className={`${pathname.endsWith("manage") ? "bg-slate-800 text-green-400" : "text-slate-500 hover:text-slate-400"} rounded-xl px-4 py-2 transition-colors`}
          href={`/frags/${fragId}/manage`}
        >
          기본 정보
        </Link>
        <Link
          className={`${pathname.endsWith("manage/members") ? "bg-slate-800 text-green-400" : "text-slate-500 hover:text-slate-400"} rounded-xl px-4 py-2 transition-colors`}
          href={`/frags/${fragId}/manage/members`}
        >
          멤버 관리
        </Link>
        <Link
          className={`${pathname.endsWith("manage/posts") ? "bg-slate-800 text-green-400" : "text-slate-500 hover:text-slate-400"} rounded-xl px-4 py-2 transition-colors`}
          href={`/frags/${fragId}/manage/posts`}
        >
          게시글 관리
        </Link>
        <Link
          className="rounded-xl px-4 py-2 text-slate-500 transition-colors hover:text-red-400"
          href={`/frags/${fragId}/posts`}
        >
          나가기
        </Link>
      </div>
    </div>
  );
}
