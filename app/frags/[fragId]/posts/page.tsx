import PostList from "@/components/posts/PostList";
import PostSearchBar from "@/components/posts/PostSearchBar";
import { Metadata } from "next";
import prisma from "@/lib/db";

export async function generateMetadata(props: {
  params: Promise<{ fragId: string }>;
}): Promise<Metadata> {
  "use server";
  const params = await props.params;
  const { fragId } = params;

  const frag = await prisma.frag.findUnique({
    where: { id: fragId },
    select: { name: true },
  });

  return {
    title: `${frag?.name} | FRAGS`,
  };
}

export default async function FragPage(props: {
  params: Promise<{ fragId: string }>;
}) {
  const params = await props.params;
  const { fragId } = params;
  return (
    <div className="flex w-full max-w-6xl flex-col gap-10">
      <PostSearchBar />
      <PostList fragId={fragId} />
    </div>
  );
}
