import {
  getCommentsByPostId,
  getPostByPostId,
  getUserByUserId,
} from "@/lib/api";
import AuthorInfo from "@/components/posts/AuthorInfo";
import PostDate from "@/components/posts/PostDate";
import PostTime from "@/components/posts/PostTime";
import LikeButton from "@/components/posts/LikeButton";
import CommentList from "@/components/comments/CommentList";
import CommentInput from "@/components/comments/CommentInput";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const postId = Number(params.postId);

  const post = await getPostByPostId(postId);
  const author = await getUserByUserId(post.userId);

  return (
    <div className="flex flex-col gap-10">
      <section
        className="flex flex-col gap-6 rounded-2xl bg-slate-900 p-10 shadow-2xl"
        style={{ width: "48rem" }}
      >
        <div className="flex flex-col items-start justify-start gap-6 ">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="flex items-center justify-start gap-2">
            <AuthorInfo
              author={author}
              enableIcon={true}
              className="bg-slate-800"
            />
            <PostDate date={post.createdAt} />
            <PostTime date={post.createdAt} />
          </div>
        </div>
        <hr className="w-full border border-slate-700" />
        <p className="leading-8">{post.content}</p>
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
