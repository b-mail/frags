"use client";

import { getPostByPostId, getUserByUserId } from "@/lib/api";
import AuthorInfo from "@/components/posts/AuthorInfo";
import PostDate from "@/components/posts/PostDate";
import PostTime from "@/components/posts/PostTime";
import LikeButton from "@/components/posts/LikeButton";
import CommentList from "@/components/comments/CommentList";
import CommentInput from "@/components/comments/CommentInput";
import DeleteButton from "@/components/DeleteButton";
import { useQuery } from "@tanstack/react-query";
import { Post, User } from "@prisma/client";
import LoadingIndicator from "@/components/LoadingIndicator";
import useAuth from "@/store/AuthStore";

export default function PostPage({
  params,
}: {
  params: { fragId: string; postId: string };
}) {
  const fragId = Number(params.fragId);
  const postId = Number(params.postId);

  const accessToken = useAuth.use.accessToken();

  const {
    data: post,
    isLoading: isLoadingPost,
    isSuccess: isSuccessPost,
  } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: async () => await getPostByPostId(accessToken as string, postId),
    enabled: !!accessToken,
  });

  const {
    data: author,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
  } = useQuery<User>({
    queryKey: ["user", post?.userId],
    queryFn: async () => await getUserByUserId(post?.userId as number),
    enabled: isSuccessPost,
  });

  if (isLoadingPost || isLoadingUser) {
    return <LoadingIndicator message={"게시글 불러오는 중"} />;
  }

  return (
    <div className="flex flex-col gap-10">
      <section
        className="flex flex-col gap-6 rounded-2xl bg-slate-900 p-10 shadow-2xl"
        style={{ width: "48rem" }}
      >
        <div className="flex flex-col items-start justify-start gap-6 ">
          <h1 className="text-2xl font-bold">{post?.title}</h1>
          {isSuccessPost && isSuccessUser && (
            <div className="flex w-full justify-between gap-2">
              <div className="flex items-center justify-center gap-2">
                <AuthorInfo
                  author={author}
                  enableIcon={true}
                  className="bg-slate-800"
                />
                <PostDate date={post?.createdAt.toString()} />
                <PostTime date={post?.createdAt.toString()} />
              </div>
              <DeleteButton
                id={postId}
                fragId={fragId}
                type="post"
                author={author}
              />
            </div>
          )}
        </div>
        <hr className="w-full border border-slate-700" />
        <p className="leading-8">{post?.content ?? ""}</p>
        <div className="flex items-center justify-center">
          <LikeButton postId={postId} />
        </div>
      </section>
      <section className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl">
        <CommentInput postId={postId} />
        <CommentList postId={postId} />
      </section>
    </div>
  );
}
