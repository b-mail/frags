import { ReactNode } from "react";
import PostSideBar from "@/components/posts/PostSideBar";

export let metadata = {
  title: "FRAG | FRAGS",
  description: "FRAGS 페이지입니다.",
};

export default async function PostsLayout(props: {
  children: ReactNode;
  params: Promise<{ fragId: string }>;
}) {
  const params = await props.params;
  const { fragId } = params;
  const { children } = props;
  return (
    <div className="relative flex w-full justify-center gap-10 ">
      <PostSideBar fragId={fragId} />
      {children}
    </div>
  );
}
