import PostList from "@/components/posts/PostList";
import PostSearchBar from "@/components/posts/PostSearchBar";

export default function FragPage({ params }: { params: { fragId: string } }) {
  const fragId = Number(params.fragId);

  return (
    <div className=" flex flex-col gap-10">
      <PostSearchBar />
      <PostList fragId={fragId} />
    </div>
  );
}
