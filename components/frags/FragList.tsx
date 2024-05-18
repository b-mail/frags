"use client";

import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFrags } from "@/lib/api";
import useAuth from "@/store/AuthStore";
import useFragSearch from "@/store/FragSearchStore";
import FragListItem from "@/components/frags/FragListItem";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { ApiResponse } from "@/lib/type";
import { Frag } from "@prisma/client";

export default function FragList() {
  const search = useFragSearch.use.search();
  const order = useFragSearch.use.order();
  const filter = useFragSearch.use.filter();

  const user = useAuth.use.user();
  const accessToken = useAuth.use.accessToken();

  const observeTargetRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ApiResponse<Frag[]>>({
      queryKey: ["frags", search, order, filter],
      queryFn: async ({ pageParam }) => {
        return await getFrags(accessToken!, {
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
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.nextPage : undefined,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    const { current: target } = observeTargetRef;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [observeTargetRef, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <section className="flex flex-col gap-10">
      {!accessToken || isLoading ? (
        <LoadingIndicator message="FRAGS 불러오는 중" />
      ) : (
        <ul className="flex list-none flex-col gap-10">
          {data?.pages.flatMap((page) => page.result).length !== 0 ? (
            data?.pages
              .flatMap((page) => page.result)
              .map((frag) => <FragListItem key={frag.id} frag={frag} />)
          ) : (
            <li className="rounded-2xl bg-slate-900 p-6 text-slate-500 shadow-2xl">
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
