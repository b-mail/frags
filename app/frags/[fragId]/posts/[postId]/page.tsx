import { getCommentsByPostId, getPostByPostId } from "@/lib/api";
import CommentList from "@/components/comments/CommentList";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const postId = Number(params.postId);
  const post = await getPostByPostId(postId);

  const comments = await getCommentsByPostId(postId);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <CommentList comments={comments} />
    </div>
  );
}
