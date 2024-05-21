"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePostByPostId,
  getPostByPostId,
  getUserByUserId,
} from "@/lib/api";
import { Post, User } from "@prisma/client";
import useAuth from "@/store/AuthStore";
import UserBadge from "@/components/ui/UserBadge";
import DateBadge from "@/components/ui/DateBadge";
import TimeBadge from "@/components/ui/TimeBadge";
import LikeButton from "@/components/posts/LikeButton";
import LoadingContainer from "@/components/ui/LoadingContainer";
import { ApiResponse } from "@/lib/type";
import { useState } from "react";
import PostForm from "@/components/posts/PostForm";
import DeleteButton from "@/components/ui/DeleteButton";
import EditButton from "@/components/ui/EditButton";
import { useRouter } from "next/navigation";
import LoadingModal from "@/components/ui/LoadingModal";

export default function PostContent({ postId }: { postId: number }) {
  const [editMode, setEditMode] = useState(false);

  const user = useAuth.use.user();
  const accessToken = useAuth.use.accessToken();

  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: post,
    isLoading: isLoadingPost,
    isSuccess: isSuccessPost,
  } = useQuery<ApiResponse<Post>>({
    queryKey: ["post", postId],
    queryFn: async () => await getPostByPostId(accessToken!, postId),
    enabled: !!accessToken,
  });

  const { data: author, isLoading: isLoadingUser } = useQuery<
    ApiResponse<User>
  >({
    queryKey: ["user", post?.result.userId],
    queryFn: async () => await getUserByUserId(post!.result.userId),
    enabled: isSuccessPost,
  });

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => await deletePostByPostId(accessToken!, postId),
    onSuccess: async () => {
      await queryClient.cancelQueries({
        queryKey: ["frag", post?.result.fragId, "posts"],
      });

      const prevPosts = queryClient.getQueryData<{
        pages: ApiResponse<Post[]>[];
      }>(["frag", post?.result.fragId, "posts", "", "latest"]);

      queryClient.setQueryData(
        ["frag", post?.result.fragId, "posts", "", "latest"],
        {
          ...prevPosts,
          pages: [...prevPosts!.pages].map((page) => {
            return {
              ...page,
              result: page.result.filter((p) => p.id !== postId),
            };
          }),
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["frag", post?.result.fragId, "posts"],
      });
      router.push(`/frags/${post?.result.fragId}/posts`);
    },
  });

  return (
    <LoadingContainer
      isLoading={!accessToken || isLoadingPost || isLoadingUser}
      message={"게시글 불러오는 중"}
    >
      {editMode && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-slate-900 bg-opacity-70 backdrop-blur-md">
          <PostForm
            fragId={post?.result.fragId!}
            initialValues={post?.result}
            targetId={post?.result.id}
            close={() => setEditMode(false)}
          />
        </div>
      )}
      {isDeleting && <LoadingModal message={"게시글 삭제 중"} />}
      <article className="flex flex-col gap-6 rounded-2xl bg-slate-900 p-10 shadow-2xl">
        <section className="flex flex-col items-start justify-start gap-6 ">
          <h1 className="text-2xl font-bold">{post?.result.title}</h1>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <UserBadge
                userName={author?.result.name ?? "작성자"}
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
                time={
                  post?.result.createdAt.toString().slice(11, 16) ?? "tt:mm"
                }
              />
            </div>
            {post?.result.userId === user?.id && (
              <div className="flex items-center gap-2">
                <EditButton onClick={() => setEditMode(true)} />
                <DeleteButton
                  onClick={() => deletePost()}
                  disabled={isDeleting}
                />
              </div>
            )}
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
