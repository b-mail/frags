import CommentList from "@/components/comments/CommentList";
import CommentInput from "@/components/comments/CommentInput";
import PostContent from "@/components/posts/PostContent";

export default function PostPage({
  params,
}: {
  params: { fragId: string; postId: string };
}) {
  const postId = Number(params.postId);

  return (
    <div className="flex flex-col gap-10" style={{ width: "48rem" }}>
      <PostContent postId={postId} />
      <section className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl">
        <CommentInput postId={postId} />
        <CommentList postId={postId} />
      </section>
    </div>
  );
}
