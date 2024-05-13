import PostForm from "@/components/posts/PostForm";

export default function NewPostPage({
  params,
}: {
  params: { fragId: string };
}) {
  const fragId = Number(params.fragId);

  return <PostForm fragId={fragId} />;
}
