"use client";

import Link from "next/link";
import useAuth from "@/store/AuthStore";
import UserMenu from "@/components/nav/UserMenu";
import { useEffect, useState } from "react";
import MenuIcon from "@/components/nav/MenuIcon";
import { logout, refresh } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

export default function Nav() {
  const [isActive, setIsActive] = useState(false);
  const user = useAuth.use.user();
  const setUser = useAuth.use.setUser();
  const setAccessToken = useAuth.use.setAccessToken();

  const refreshMutation = useMutation({
    mutationKey: ["refresh"],
    mutationFn: refresh,
    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      setUser(null);
      setAccessToken(null);
      setIsActive(false);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    if (!user) {
      refreshMutation.mutate();
    }
  }, []);

  return (
    <nav className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-slate-900 bg-opacity-75 px-10 shadow-xl backdrop-blur-lg">
      <Link
        href="/"
        className="flex cursor-pointer items-center justify-center gap-2"
      >
        <Image src={"/2.png"} alt={"로고"} width={40} height={40} />
        <div className="text-2xl font-bold hover:text-green-400">FRAGS</div>
      </Link>
      <section className="flex w-48 items-center justify-center">
        {user ? (
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <button
              className="flex w-full cursor-pointer items-center justify-end gap-4"
              onClick={() => setIsActive(!isActive)}
            >
              <div className="flex w-full items-center justify-end gap-4 text-end">
                {user.name}
              </div>
              <MenuIcon isActive={isActive} />
            </button>
            <UserMenu user={user} isActive={isActive} onLogout={handleLogout} />
          </div>
        ) : (
          <div className="flex w-full items-center justify-center gap-4 text-center">
            <Link className="hover:text-green-400" href="/login">
              로그인
            </Link>
            <hr className="h-6 w-0 border border-slate-600" />
            <Link className="hover:text-green-400" href="/register">
              회원가입
            </Link>
          </div>
        )}
      </section>
    </nav>
  );
}
