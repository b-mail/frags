import { ReactNode } from "react";
import PostSideBar from "@/components/posts/PostSideBar";

export default async function PostsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { fragId: string };
}) {
  return (
    <div className="relative flex gap-10 ">
      <PostSideBar fragId={params.fragId} />
      {children}
    </div>
  );
}
