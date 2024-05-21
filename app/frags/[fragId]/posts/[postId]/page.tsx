import CommentList from "@/components/comments/CommentList";
import CommentForm from "@/components/comments/CommentForm";
import PostContent from "@/components/posts/PostContent";
import { Metadata } from "next";
import prisma from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}): Promise<Metadata> {
  "use server";
  const postId = Number(params.postId);
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { title: true },
  });

  return {
    title: `${post?.title} | FRAGS`,
  };
}

export default function PostPage({
  params,
}: {
  params: { fragId: string; postId: string };
}) {
  const postId = Number(params.postId);

  return (
    <div className="w-192 flex flex-col gap-10">
      <PostContent postId={postId} />
      <section className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl">
        <CommentForm postId={postId} />
        <hr className="w-full border border-slate-700" />
        <CommentList postId={postId} />
      </section>
    </div>
  );
}
