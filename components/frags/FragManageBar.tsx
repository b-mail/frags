"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/lib/type";
import { Frag } from "@prisma/client";
import { getFragByFragId } from "@/lib/api";
import { useEffect } from "react";
import useAuth from "@/store/AuthStore";

export default function FragManageBar({ fragId }: { fragId: number }) {
  const user = useAuth.use.user();

  const pathname = usePathname();
  const router = useRouter();

  const { data, isSuccess } = useQuery<ApiResponse<Frag>>({
    queryKey: ["frag", fragId],
    queryFn: async () => await getFragByFragId(fragId),
  });

  useEffect(() => {
    if (user && data && data.result.adminId !== user.id) {
      router.push(`/frags/${fragId}/posts`);
    }
  }, [isSuccess, data, user]);

  return (
    <div className="flex items-center justify-center gap-10 rounded-2xl bg-slate-900 p-4 px-10 shadow-2xl">
      <h2 className="text-xl font-bold">FRAG 관리</h2>
      <Link
        className={`hover:text-green-400 ${pathname.endsWith("manage") ? "text-green-400" : "text-slate-500"}`}
        href={`/frags/${fragId}/manage`}
      >
        기본 정보
      </Link>
      <Link
        className={`hover:text-green-400 ${pathname.endsWith("manage/members") ? "text-green-400" : "text-slate-500"}`}
        href={`/frags/${fragId}/manage/members`}
      >
        멤버 관리
      </Link>
      <Link
        className={`hover:text-green-400 ${pathname.endsWith("manage/posts") ? "text-green-400" : "text-slate-500"}`}
        href={`/frags/${fragId}/manage/posts`}
      >
        게시글 관리
      </Link>
      <Link
        className="text-slate-500 hover:text-red-400"
        href={`/frags/${fragId}/posts`}
      >
        나가기
      </Link>
    </div>
  );
}
