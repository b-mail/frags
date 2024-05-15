"use client";

import PostList from "@/components/posts/PostList";
import { useState } from "react";
import SearchInput from "@/components/SearchInput";
import PostOrder from "@/components/posts/PostOrder";

export default function FragPage({ params }: { params: { fragId: string } }) {
  const fragId = Number(params.fragId);

  const [order, setOrder] = useState<"latest" | "like">("latest");
  const [search, setSearch] = useState<string>("");

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
