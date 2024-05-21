import PostList from "@/components/posts/PostList";
import PostSearchBar from "@/components/posts/PostSearchBar";
import { Metadata } from "next";
import prisma from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: { fragId: string };
}): Promise<Metadata> {
  "use server";
  const fragId = Number(params.fragId);
  const frag = await prisma.frag.findUnique({
    where: { id: fragId },
    select: { name: true },
  });

  return {
    title: `${frag?.name} | FRAGS`,
  };
}

export default function FragPage({ params }: { params: { fragId: string } }) {
  const fragId = Number(params.fragId);

  return (
    <div className=" flex flex-col gap-10">
      <PostSearchBar />
      <PostList fragId={fragId} />
    </div>
  );
}
