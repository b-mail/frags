"use client";

import Link from "next/link";
import useAuth from "@/store/AuthStore";
import UserMenu from "@/components/nav/UserMenu";
import { useEffect, useState } from "react";
import MenuIcon from "@/components/nav/MenuIcon";
import { refresh, logout } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import PulseContainer from "@/components/ui/PulseContainer";
import { usePathname, useRouter } from "next/navigation";
import LoadingModal from "@/components/ui/LoadingModal";

export default function Nav() {
  const [isActive, setIsActive] = useState(false);

  const user = useAuth.use.user();
  const setUser = useAuth.use.setUser();
  const setAccessToken = useAuth.use.setAccessToken();
  const isRefreshing = useAuth.use.isRefreshing();
  const setIsRefreshing = useAuth.use.setIsRefreshing();

  const pathname = usePathname();
  const router = useRouter();

  const { mutate: refreshMutate } = useMutation({
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

  const { mutate: logoutMutate, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => await logout(),
    onSettled: () => {
      setUser(null);
      setAccessToken(null);
      setIsActive(false);
      router.push("/");
    },
  });

  const handleLogout = () => {
    logoutMutate();
  };

  useEffect(() => {
    if (!user) {
      refreshMutate();
    }
  }, []);

  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  return (
    <>
      {isLoggingOut && <LoadingModal message={"로그아웃 중"} />}
      {user && (
        <UserMenu
          user={user}
          isActive={isActive}
          setIsActive={setIsActive}
          onLogout={handleLogout}
          isPending={isLoggingOut}
        />
      )}
      <nav className="fixed top-4 left-1/2 z-50 flex h-14 w-[calc(100%-2rem)] -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 px-4 shadow-lg backdrop-blur-xl md:h-16 md:w-[90%] md:px-10">
        <Link
          href="/"
          className="flex min-h-[40px] shrink-0 cursor-pointer items-center justify-center gap-2"
        >
          <Image
            src={"/logo.png"}
            alt={"로고"}
            width={30}
            height={30}
            className="h-8 w-8 md:h-[40px] md:w-[40px]"
          />
          <div className="text-base font-bold hover:text-green-400 md:text-2xl">
            FRAGS
          </div>
        </Link>
        <section className="flex flex-1 items-center justify-end overflow-hidden md:w-48 lg:flex-none">
          <PulseContainer isLoading={isRefreshing}>
            {user ? (
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <button
                  className="flex w-full cursor-pointer items-center justify-end gap-2 md:gap-4"
                  onClick={() => setIsActive(!isActive)}
                >
                  <div className="truncate text-sm font-medium text-slate-200 md:text-base">
                    {user.name}
                  </div>
                  <MenuIcon isActive={isActive} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-1 text-sm md:gap-4 md:text-base">
                <Link className="px-2 py-1 hover:text-green-400" href="/login">
                  로그인
                </Link>
                <hr className="h-3 w-px border-none bg-slate-700 md:h-6" />
                <Link
                  className="px-2 py-1 hover:text-green-400"
                  href="/register"
                >
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
