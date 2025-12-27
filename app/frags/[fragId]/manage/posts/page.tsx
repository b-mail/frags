import PostList from "@/components/posts/PostList";

export default async function PostManagePage(props: {
  params: Promise<{ fragId: string }>;
}) {
  const params = await props.params;
  const { fragId } = params;
  return (
    <div className="w-full">
      <PostList fragId={fragId} isAdmin={true} />
    </div>
  );
}
