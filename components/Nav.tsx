"use client";

import Link from "next/link";
import useAuth from "@/store/AuthStore";
import UserMenu from "@/components/UserMenu";
import { useState } from "react";
import MenuIcon from "@/components/MenuIcon";

export default function Nav() {
  const [isActive, setIsActive] = useState(false);
  const user = useAuth.use.user();

  return (
    <nav className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-slate-900 bg-opacity-75 px-10 shadow-xl backdrop-blur-lg">
      <section>
        <Link
          className="text-2xl font-bold italic hover:text-green-400"
          href="/"
        >
          FRAGS
        </Link>
      </section>
      <section className="flex w-48 items-center justify-center">
        {user ? (
          <div className="flex w-full flex-col items-center justify-center">
            <button
              className="flex w-full cursor-pointer items-center justify-end gap-4"
              onClick={() => setIsActive(!isActive)}
            >
              <div className="w-full text-end">{user.name}</div>
              <MenuIcon isActive={isActive} />
            </button>
            <UserMenu user={user} isActive={isActive} />
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
