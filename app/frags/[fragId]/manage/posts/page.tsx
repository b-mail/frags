import PostList from "@/components/posts/PostList";

export default function PostManagePage({
  params,
}: {
  params: { fragId: string };
}) {
  const fragId = Number(params.fragId);

  return (
    <div className="w-192">
      <PostList fragId={fragId} isAdmin={true} />
    </div>
  );
}
