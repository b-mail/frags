"use client";

import { User } from "@prisma/client";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/lib/api";
import useAuth from "@/store/AuthStore";
import LoadingModal from "@/components/ui/LoadingModal";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function UserMenu({
  user,
  isActive,
  setIsActive,
}: {
  user: User;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}) {
  const { name, email, bio } = user;

  const setUser = useAuth.use.setUser();
  const setAccessToken = useAuth.use.setAccessToken();

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => await logout(),
    onSettled: () => {
      setUser(null);
      setAccessToken(null);
      setIsActive(false);
      router.push("/");
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className={`${
          isActive ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        } fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300`}
        onClick={() => setIsActive(false)}
      />

      {/* Dropdown Menu */}
      <div
        className={`${
          isActive ? "translate-y-0 opacity-100 visible" : "-translate-y-2 opacity-0 invisible"
        } fixed left-1/2 top-20 z-50 flex w-[95%] -translate-x-1/2 flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-in-out md:left-auto md:right-[5%] md:top-24 md:w-64 md:translate-x-0`}
      >
        {isPending && <LoadingModal message={"로그아웃 중"} />}
        
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold text-white">{name}</div>
          <div className="text-xs text-slate-500">{email}</div>
        </div>
        
        <div className="py-2 text-sm text-slate-300">
          {bio ?? "소개글이 없습니다."}
        </div>

        <hr className="border-slate-800" />
        
        <div className="flex flex-col gap-2">
          <Link
            className="rounded-xl bg-slate-800 py-3 text-center text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
            href="/me"
            onClick={() => setIsActive(false)}
          >
            마이페이지
          </Link>
          <button
            className="rounded-xl bg-slate-800 py-3 text-center text-sm font-medium text-red-500 hover:bg-slate-700 hover:text-red-400 disabled:bg-slate-800 disabled:text-slate-500"
            onClick={handleLogout}
            disabled={isPending}
          >
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
}
