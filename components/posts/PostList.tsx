"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPostsByFragId } from "@/lib/api";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Post } from "@prisma/client";
import useAuth from "@/store/AuthStore";
import usePostSearch from "@/store/PostSearchStore";
import PostListItem from "@/components/posts/PostListItem";
import LoadingContainer from "@/components/ui/LoadingContainer";
import { ApiResponse } from "@/lib/type";

export default function PostList({ fragId }: { fragId: number }) {
  const search = usePostSearch.use.search();
  const order = usePostSearch.use.order();

  const accessToken = useAuth.use.accessToken();

  const router = useRouter();

  const {
    data,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<ApiResponse<Post[]>>({
    queryKey: ["frag", fragId, "posts", search, order],
    queryFn: async ({ pageParam }) =>
      await getPostsByFragId(accessToken as string, fragId, {
        page: pageParam as number,
        limit: 10,
        order,
        search: search || undefined,
      }),
    enabled: !!accessToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });

  useEffect(() => {
    if (isError) {
      router.push("/frags");
    }
  }, [isError, router]);

  return (
    <LoadingContainer
      isLoading={isLoading || isFetching}
      message={"게시글 목록 불러오는 중 "}
    >
      <div className=" flex w-full flex-col gap-6">
        {data?.pages.flat()[0].result.length === 0 ? (
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
        {hasNextPage && (
          <LoadingContainer
            isLoading={isFetchingNextPage}
            message={"더 불러오는 중"}
          >
            <button
              className=" rounded-2xl bg-slate-900 px-6 py-4 text-slate-500 shadow-2xl hover:text-green-400"
              onClick={() => fetchNextPage()}
            >
              더 불러오기
            </button>
          </LoadingContainer>
        )}
      </div>
    </LoadingContainer>
  );
}
