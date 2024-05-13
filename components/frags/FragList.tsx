"use client";

import { Frag } from "@prisma/client";
import FragListItem from "@/components/frags/FragListItem";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFrags } from "@/lib/api";
import useAuth from "@/store/AuthStore";
import { useEffect, useRef } from "react";

export default function FragList({
  searchOption,
}: {
  searchOption: {
    order: "latest" | "alphabet" | "member";
    search: string;
    filter: "all" | "member" | "admin";
  };
}) {
  const { order, search, filter } = searchOption;

  const user = useAuth.use.user();
  const accessToken = useAuth.use.accessToken();

  const observeTargetRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    isLoading,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<{
    result: Frag[];
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
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    const nod = observeTargetRef.current;

    if (nod) {
      observer.observe(nod);
    }

    return () => {
      if (nod) {
        observer.unobserve(nod);
      }
    };
  }, [observeTargetRef, hasNextPage, fetchNextPage]);

  return (
    <section className="flex flex-col gap-10">
      {isLoading || !isSuccess ? (
        <LoadingIndicator message="FRAGS 불러오는 중" />
      ) : (
        <ul className="flex list-none flex-col gap-10">
          {data?.pages.flatMap((page) => page.result).length !== 0 ? (
            data?.pages
              .flatMap((page) => page.result)
              .map((frag) => <FragListItem key={frag.id} frag={frag} />)
          ) : (
            <li className="rounded-2xl bg-slate-900 p-6 shadow-2xl">
              검색 조건에 맞는 FRAG을 찾을 수 없습니다.
            </li>
          )}
        </ul>
      )}
      {hasNextPage && (
        <div
          className="flex w-full items-center justify-center rounded-2xl"
          onClick={() => fetchNextPage()}
          ref={observeTargetRef}
        >
          {isFetchingNextPage && (
            <LoadingIndicator message={"더 불러오는 중"} />
          )}
        </div>
      )}
    </section>
  );
}
