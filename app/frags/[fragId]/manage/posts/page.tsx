import PostList from "@/components/posts/PostList";

export default async function PostManagePage(props: {
  params: Promise<{ fragId: string }>;
}) {
  const params = await props.params;
  const { fragId } = params;
  return (
    <div className="w-full">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        게시글 관리
      </h2>
      <PostList fragId={fragId} isAdmin={true} />
    </div>
  );
}
