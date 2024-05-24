import { ReactNode } from "react";
import PostSideBar from "@/components/posts/PostSideBar";

export let metadata = {
  title: "FRAG | FRAGS",
  description: "FRAGS 페이지입니다.",
};

export default async function PostsLayout({
  children,
  params: { fragId },
}: {
  children: ReactNode;
  params: { fragId: string };
}) {
  return (
    <div className="relative flex gap-10 ">
      <PostSideBar fragId={fragId} />
      {children}
    </div>
  );
}
