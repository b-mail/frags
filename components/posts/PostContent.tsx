"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostByPostId, getUserByUserId } from "@/lib/api";
import { Post, User } from "@prisma/client";
import useAuth from "@/store/AuthStore";
import UserBadge from "@/components/ui/UserBadge";
import DateBadge from "@/components/ui/DateBadge";
import TimeBadge from "@/components/ui/TimeBadge";
import LikeButton from "@/components/posts/LikeButton";
import LoadingContainer from "@/components/ui/LoadingContainer";
import { ApiResponse } from "@/lib/type";

export default function PostContent({ postId }: { postId: number }) {
  const accessToken = useAuth.use.accessToken();

  const {
    data: post,
    isLoading: isLoadingPost,
    isSuccess: isSuccessPost,
  } = useQuery<ApiResponse<Post>>({
    queryKey: ["post", postId],
    queryFn: async () => await getPostByPostId(accessToken as string, postId),
    enabled: !!accessToken,
  });

  const { data: author, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: ["user", post?.result.userId],
    queryFn: async () => await getUserByUserId(post?.result.userId as number),
    enabled: isSuccessPost,
  });

  return (
    <LoadingContainer
      isLoading={!accessToken || isLoadingPost || isLoadingUser}
      message={"게시글 불러오는 중"}
    >
      <article className="flex flex-col gap-6 rounded-2xl bg-slate-900 p-10 shadow-2xl">
        <section className="flex flex-col items-start justify-start gap-6 ">
          <h1 className="text-2xl font-bold">{post?.result.title}</h1>
          <div className="flex w-full items-center justify-start gap-2">
            <UserBadge
              userName={author?.name ?? "홍길동"}
              enableIcon={true}
              className="bg-slate-800"
            />
            <DateBadge
              date={
                post?.result.createdAt
                  .toString()
                  .slice(0, 10)
                  .replaceAll("-", ". ") ?? "yyyy. mm. dd"
              }
            />
            <TimeBadge
              time={post?.result.createdAt.toString().slice(11, 16) ?? "tt:mm"}
            />
          </div>
        </section>
        <hr className="w-full border border-slate-700" />
        <section className="flex flex-col gap-10">
          <p className="leading-8">{post?.result.content ?? ""}</p>
          <div className="flex items-center justify-center">
            <LikeButton postId={postId} />
          </div>
        </section>
      </article>
    </LoadingContainer>
  );
}
