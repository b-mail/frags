"use client";

import PostListItem from "@/components/posts/PostListItem";
import { Post } from "@prisma/client";
import { getPostsByFragId } from "@/lib/api";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/store/AuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function PostList({
  fragId,
  searchOption,
}: {
  fragId: number;
  searchOption: {
    order: "latest" | "like";
    search: string;
  };
}) {
  const { order, search } = searchOption;

  const accessToken = useAuth.use.accessToken();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<{
    result: Post;
    count: number;
    hasNextPage: boolean;
    nextPage: number;
  }>({
    queryKey: ["frag", fragId, "posts", order, search],
    queryFn: async ({ pageParam }) =>
      await getPostsByFragId(accessToken as string, fragId, {
        page: pageParam as number,
        limit: 10,
        order,
        search: search || undefined,
      }),
    enabled: !!accessToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });

  useEffect(() => {
    if (
      !queryClient.isMutating({
        mutationKey: ["refresh"],
      }) &&
      !accessToken
    ) {
      router.push("/login");
    }
  }, [router, queryClient, accessToken]);

  useEffect(() => {
    if (isError) {
      router.push("/frags");
    }
  }, [isError, router]);

  return isLoading || isFetching ? (
    <LoadingIndicator message={"게시글 목록 불러오는 중"} />
  ) : (
    <div className=" flex w-full flex-col gap-6">
      {data?.pages.flatMap((page) => page.result).length === 0 ? (
        <p className=" rounded-2xl bg-slate-900 px-10 py-4 text-center text-slate-500 shadow-2xl">
          표시할 게시글이 없습니다.
        </p>
      ) : (
        <ul className="flex list-none flex-col gap-4 rounded-2xl bg-slate-900 p-6 shadow-2xl">
          {data?.pages
            .flatMap((page) => page.result)
            .map((post: Post) => <PostListItem key={post.id} post={post} />)}
        </ul>
      )}
      {hasNextPage &&
        (isFetchingNextPage ? (
          <LoadingIndicator message={"더 불러오는 중"} />
        ) : (
          <button
            className=" rounded-2xl bg-slate-900 px-6 py-4 text-slate-500 shadow-2xl hover:text-green-400"
            onClick={() => fetchNextPage()}
          >
            더 불러오기
          </button>
        ))}
    </div>
  );
}
