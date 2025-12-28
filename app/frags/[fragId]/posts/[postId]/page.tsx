import CommentList from "@/components/comments/CommentList";
import CommentForm from "@/components/comments/CommentForm";
import PostContent from "@/components/posts/PostContent";
import { Metadata } from "next";
import prisma from "@/lib/db";
import ViewCounter from "@/components/posts/ViewCoutner";

export async function generateMetadata(props: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  "use server";
  const params = await props.params;
  const { postId } = params;
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { title: true },
  });

  return {
    title: `${post?.title} | FRAGS`,
  };
}

export default async function PostPage(props: {
  params: Promise<{ postId: string }>;
}) {
  const params = await props.params;
  const { postId } = params;
  return (
    <div className="flex w-full max-w-3xl flex-col gap-10">
      <PostContent postId={postId} />
      <section className="flex flex-col gap-6 rounded-2xl bg-slate-900 p-8 shadow-2xl md:p-10">
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <svg
              className="h-6 w-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 20h9m0 0l-2-4m2 4l-4-2m-7 4H3m0 0l2-4m-2 4l4-2m2-8a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            댓글 작성
          </h2>
          <CommentForm postId={postId} />
        </div>
        <hr className="w-full border border-slate-700" />
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <svg
              className="h-6 w-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            댓글
          </h2>
          <CommentList postId={postId} />
        </div>
      </section>
      <ViewCounter postId={postId} />
    </div>
  );
}
