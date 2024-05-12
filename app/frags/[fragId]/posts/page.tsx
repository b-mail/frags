"use client";

import PostList from "@/components/posts/PostList";
import { useEffect, useState } from "react";
import SearchInput from "@/components/SearchInput";
import PostOrder from "@/components/posts/PostOrder";
import useAuth from "@/store/AuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function FragPage({ params }: { params: { fragId: string } }) {
  const fragId = Number(params.fragId);
  const [order, setOrder] = useState<"latest" | "like">("latest");
  const [search, setSearch] = useState<string>("");

  const accessToken = useAuth.use.accessToken();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (!queryClient.isMutating({ mutationKey: ["refresh"] }) && !accessToken) {
      router.push("/login");
    }
  }, [accessToken, queryClient, router]);

  return (
    <div className=" flex flex-col gap-10">
      <div className="flex w-full items-center justify-between rounded-2xl bg-slate-900 p-4 shadow-2xl">
        <SearchInput search={search} setSearch={setSearch} />
        <PostOrder order={order} setOrder={setOrder} />
      </div>
      <PostList fragId={fragId} searchOption={{ order, search }} />
    </div>
  );
}
