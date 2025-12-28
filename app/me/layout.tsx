"use client";

import { ReactNode } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/utils/ProtectedRoute";
import { usePathname } from "next/navigation";

export default function MyPageLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ProtectedRoute>
      <div className="flex w-full max-w-6xl flex-col items-start justify-center gap-10 md:flex-row">
        <div className="flex w-full flex-col gap-2 rounded-2xl bg-slate-900 p-6 shadow-2xl md:w-64">
          <Link
            className={`rounded-xl p-4 transition-colors ${
              pathname === "/me"
                ? "bg-slate-800 text-green-400"
                : "text-slate-500 hover:bg-slate-800 hover:text-slate-400"
            }`}
            href="/me"
          >
            프로필
          </Link>
          <Link
            className={`rounded-xl p-4 transition-colors ${
              pathname === "/me/edit"
                ? "bg-slate-800 text-green-400"
                : "text-slate-500 hover:bg-slate-800 hover:text-slate-400"
            }`}
            href="/me/edit"
          >
            내 정보 수정
          </Link>
          <Link
            className={`rounded-xl p-4 transition-colors ${
              pathname === "/me/delete"
                ? "bg-slate-800 text-red-500"
                : "text-slate-500 hover:bg-slate-800 hover:text-red-400"
            }`}
            href="/me/delete"
          >
            회원탈퇴
          </Link>
        </div>
        <div className="w-full flex-1">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
