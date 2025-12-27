import CommentList from "@/components/comments/CommentList";
import CommentForm from "@/components/comments/CommentForm";
import PostContent from "@/components/posts/PostContent";
import { Metadata } from "next";
import prisma from "@/lib/db";
import ViewCounter from "@/components/posts/ViewCoutner";

export async function generateMetadata(
  props: { params: Promise<{ postId: string }> }
): Promise<Metadata> {
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
      <section className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl">
        <CommentForm postId={postId} />
        <hr className="w-full border border-slate-700" />
        <CommentList postId={postId} />
      </section>
      <ViewCounter postId={postId} />
    </div>
  );
}
