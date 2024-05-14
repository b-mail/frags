"use client";

import { User } from "@prisma/client";
import Link from "next/link";
import { logout } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/store/AuthStore";

export default function UserMenu({
  user,
  isActive,
  onLogout,
}: {
  user: User;
  isActive: boolean;
  onLogout: () => void;
}) {
  const { name, email, bio } = user;

  const queryClient = useQueryClient();

  return isActive ? (
    <div className="absolute top-16 flex w-60 flex-col gap-4 rounded-b-2xl bg-slate-900 p-6 shadow-2xl">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">{name}</div>
        <div className="text-xs text-slate-500">{email}</div>
      </div>
      <div className="pb-4 text-sm">{bio ?? ""}</div>
      <hr className="border border-slate-800" />
      <Link
        className="rounded-lg bg-slate-800 py-2 text-center text-slate-400 hover:bg-slate-700 hover:text-slate-300"
        href="/mypage"
      >
        마이페이지
      </Link>
      <button
        className="rounded-lg bg-slate-800 py-2 text-center text-red-500 hover:bg-slate-700 hover:text-red-400 disabled:bg-slate-800 disabled:text-slate-500"
        onClick={onLogout}
        disabled={!!queryClient.isMutating({ mutationKey: ["logout"] })}
      >
        로그아웃
      </button>
    </div>
  ) : null;
}
