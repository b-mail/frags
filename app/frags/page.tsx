"use client";

import axios from "@/lib/axios";
import useAuth from "@/store/AuthStore";
import { Frag } from "@prisma/client";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getFrags, uploadFrag } from "@/lib/api";
import { useRouter } from "next/navigation";
import FragList from "@/components/FragList";

export default function FragsPage() {
  const [order, setOrder] = useState<"latest" | "alphabet" | "member">(
    "latest",
  );
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "member" | "admin">("all");

  const user = useAuth.use.user();
  const accessToken = useAuth.use.accessToken();

  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, isSuccess } = useInfiniteQuery<{
    frags: Frag[];
    count: number;
    hasMore: boolean;
  }>({
    queryKey: ["frags", order, search, filter],
    queryFn: async ({ pageParam }) => {
      return await getFrags(accessToken as string, {
        page: pageParam,
        limit: 6,
        search: search ? search : undefined,
        order: order,
        member: filter === "member" ? user?.id : undefined,
        admin: filter === "admin" ? user?.id : undefined,
      });
    },
    enabled: !!accessToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.hasMore ? (lastPageParam as number) + 1 : undefined,
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
          <input
            className="w-96 rounded-2xl border-2 border-slate-600 bg-slate-800 px-4 py-2 focus:border-slate-500 focus:outline-0"
            placeholder="검색어를 입력하세요"
          />
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
      <section>
        {isLoading || !isSuccess ? (
          "로딩중"
        ) : (
          <FragList frags={data.pages[0].frags} />
        )}
      </section>
    </div>
  );
}
