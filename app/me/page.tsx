"use client";

import useAuth from "@/store/AuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function MyPage() {
  const user = useAuth.use.user();

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user && !queryClient.isMutating({ mutationKey: ["refresh"] })) {
      router.push("/login");
    }
  }, [user, queryClient, router]);

  if (!user) {
    return (
      <div style={{ width: "48rem" }}>
        <LoadingIndicator message="사용자 정보를 불러오는 중" />
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl bg-slate-900 p-10 shadow-2xl"
      style={{ width: "48rem" }}
    >
      <div className="flex flex-col gap-4">
        <div className="text-3xl font-bold">{user?.name}</div>
        <div className="rounded-2xl bg-slate-800 p-4 text-slate-400">
          {user.bio && user.bio.length > 0 ? user?.bio : "소개가 없습니다."}
        </div>
        <div className="text-sm text-slate-500">
          <span className="mr-4 inline-block w-24 rounded-2xl bg-slate-800 p-2 text-center text-green-400">
            이메일
          </span>
          {user?.email}
        </div>
        <div className="text-sm text-slate-500">
          <span className="mr-4 inline-block w-24 rounded-2xl bg-slate-800 p-2 text-center text-green-400">
            가입일자
          </span>
          {user?.createdAt.toString().slice(0, 10).split("-").join(". ")}
        </div>
      </div>
    </div>
  );
}
