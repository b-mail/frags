import { ReactNode } from "react";
import PostsSideBar from "@/components/posts/PostsSideBar";

export default async function PostsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { fragId: string };
}) {
  return (
    <div className="relative flex gap-10 ">
      <PostsSideBar fragId={params.fragId} />
      {children}
    </div>
  );
}
