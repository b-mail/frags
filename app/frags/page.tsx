"use client";

import useAuth from "@/store/AuthStore";
import { Frag } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getFrags, uploadFrag } from "@/lib/api";
import { useRouter } from "next/navigation";
import FragList from "@/components/FragList";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function FragsPage() {
  const [order, setOrder] = useState<"latest" | "alphabet" | "member">(
    "latest",
  );
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "member" | "admin">("all");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const user = useAuth.use.user();
  const accessToken = useAuth.use.accessToken();

  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data,
    fetchNextPage,
    isLoading,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<{
    frags: Frag[];
    count: number;
    hasNextPage: boolean;
    nextPage: number;
  }>({
    queryKey: ["frags", order, search, filter],
    queryFn: async ({ pageParam }) => {
      return await getFrags(accessToken as string, {
        page: pageParam as number,
        limit: 6,
        search: search ? search : undefined,
        order: order,
        member: filter === "member" ? user?.id : undefined,
        admin: filter === "admin" ? user?.id : undefined,
      });
    },
    enabled: !!accessToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });

  useEffect(() => {
    if (!queryClient.isMutating({ mutationKey: ["refresh"] }) && !user) {
      router.push("/login");
    }
  }, [user, queryClient]);

  return (
    <div className="flex flex-col items-center gap-12">
      <section className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <form
            className="flex w-96 justify-between gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSearch(searchInputRef.current?.value as string);
            }}
          >
            <input
              className="flex-grow rounded-2xl border-4 border-slate-800 bg-slate-800 px-4 py-2 placeholder:text-slate-500 focus:border-slate-700 focus:outline-0"
              placeholder="검색어를 입력하세요"
              ref={searchInputRef}
            />
            <button
              className="rounded-2xl bg-slate-800 p-3 hover:bg-slate-700"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </form>
          <div className="flex w-96 items-center justify-end gap-4">
            <button
              className={`${order === "latest" ? "text-green-400" : "text-slate-500  hover:text-slate-400"}`}
              onClick={() => setOrder("latest")}
            >
              최신순
            </button>
            <button
              className={`${order === "alphabet" ? "text-green-400" : "text-slate-500  hover:text-slate-400"}`}
              onClick={() => setOrder("alphabet")}
            >
              가나다순
            </button>
            <button
              className={`${order === "member" ? "text-green-400" : "text-slate-500  hover:text-slate-400"}`}
              onClick={() => setOrder("member")}
            >
              멤버 많은 순
            </button>
          </div>
        </div>
        <hr className="w-full border border-slate-700" />
        <div className="flex w-full items-center justify-between">
          <button
            className={`${filter === "all" ? "bg-slate-800" : "text-slate-500 hover:text-slate-400"} w-60 rounded-2xl py-2 text-center`}
            onClick={() => setFilter("all")}
          >
            전체 FRAGS
          </button>
          <button
            className={`${filter === "member" ? "bg-slate-800" : "text-slate-500 hover:text-slate-400"} w-60 rounded-2xl py-2 text-center`}
            onClick={() => setFilter("member")}
          >
            내가 가입한 FRAGS
          </button>
          <button
            className={`${filter === "admin" ? "bg-slate-800" : "text-slate-500 hover:text-slate-400"} w-60 rounded-2xl py-2 text-center`}
            onClick={() => setFilter("admin")}
          >
            내가 만든 FRAGS
          </button>
        </div>
      </section>
      <section className="flex flex-col gap-10">
        {isLoading || !isSuccess ? (
          <LoadingIndicator />
        ) : (
          <FragList frags={data.pages.flatMap((page) => page.frags)} />
        )}
        {hasNextPage &&
          (isFetchingNextPage ? (
            <LoadingIndicator />
          ) : (
            <button
              className="flex w-full items-center justify-center rounded-2xl bg-slate-900 py-2"
              onClick={() => fetchNextPage()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 stroke-slate-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          ))}
      </section>
    </div>
  );
}
