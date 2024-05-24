import PostList from "@/components/posts/PostList";

export default function PostManagePage({
  params: { fragId },
}: {
  params: { fragId: string };
}) {
  return (
    <div className="w-192">
      <PostList fragId={fragId} isAdmin={true} />
    </div>
  );
}
