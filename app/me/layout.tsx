import { ReactNode } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/utils/ProtectedRoute";

export default function MyPageLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex items-start justify-center gap-10">
        <div className="flex w-60 flex-col gap-2 rounded-2xl bg-slate-900 p-6 shadow-2xl">
          <Link
            className="rounded-2xl p-4 text-slate-500 hover:bg-slate-800 hover:text-green-400"
            href="/me"
          >
            프로필
          </Link>
          <Link
            className="rounded-2xl p-4 text-slate-500 hover:bg-slate-800 hover:text-green-400"
            href="/me/edit"
          >
            내 정보 수정
          </Link>
          <Link
            className="rounded-2xl p-4 text-slate-500 hover:bg-slate-800 hover:text-red-400"
            href="/me/delete"
          >
            회원탈퇴
          </Link>
        </div>
        <div className="w-192">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
