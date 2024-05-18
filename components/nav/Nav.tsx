"use client";

import Link from "next/link";
import useAuth from "@/store/AuthStore";
import UserMenu from "@/components/nav/UserMenu";
import { useEffect, useState } from "react";
import MenuIcon from "@/components/nav/MenuIcon";
import { refresh } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import PulseContainer from "@/components/ui/PulseContainer";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [isActive, setIsActive] = useState(false);

  const user = useAuth.use.user();
  const setUser = useAuth.use.setUser();
  const setAccessToken = useAuth.use.setAccessToken();
  const isRefreshing = useAuth.use.isRefreshing();
  const setIsRefreshing = useAuth.use.setIsRefreshing();

  const pathname = usePathname();

  const { mutate } = useMutation({
    mutationKey: ["refresh"],
    mutationFn: async () => await refresh(),
    onMutate: () => {
      setIsRefreshing(true);
    },
    onSettled: () => {
      setIsRefreshing(false);
    },
    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);
    },
  });

  useEffect(() => {
    if (!user) {
      mutate();
    }
  }, []);

  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  return (
    <>
      {user && <UserMenu user={user} isActive={isActive} />}
      <nav className="fixed left-0 top-0 z-30 flex h-16 w-full items-center justify-between bg-slate-900 bg-opacity-70 px-10 shadow-xl backdrop-blur-md">
        <Link
          href="/"
          className="flex cursor-pointer items-center justify-center gap-2"
        >
          <Image src={"/logo.png"} alt={"로고"} width={40} height={40} />
          <div className="text-2xl font-bold hover:text-green-400">FRAGS</div>
        </Link>
        <section className="flex w-48 items-center justify-end">
          <PulseContainer isLoading={isRefreshing}>
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
          </PulseContainer>
        </section>
      </nav>
    </>
  );
}
