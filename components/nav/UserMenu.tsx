"use client";

import { User } from "@prisma/client";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/lib/api";
import useAuth from "@/store/AuthStore";
import LoadingModal from "@/components/ui/LoadingModal";
import { useRouter } from "next/navigation";

export default function UserMenu({
  user,
  isActive,
}: {
  user: User;
  isActive: boolean;
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
      router.push("/");
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <div
      className={`${isActive ? "top-16" : "-top-80"} fixed right-6 z-20 flex w-60 flex-col gap-4 rounded-b-2xl bg-slate-900 p-6 shadow-2xl transition-all duration-500`}
    >
      {isPending && <LoadingModal message={"로그아웃 중"} />}
      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">{name}</div>
        <div className="text-xs text-slate-500">{email}</div>
      </div>
      <div className="pb-4 text-sm">{bio ?? ""}</div>
      <hr className="border border-slate-800" />
      <Link
        className="rounded-lg bg-slate-800 py-2 text-center text-slate-400 hover:bg-slate-700 hover:text-slate-300"
        href="/me"
      >
        마이페이지
      </Link>
      <button
        className="rounded-lg bg-slate-800 py-2 text-center text-red-500 hover:bg-slate-700 hover:text-red-400 disabled:bg-slate-500 disabled:text-white"
        onClick={handleLogout}
        disabled={isPending}
      >
        로그아웃
      </button>
    </div>
  );
}
