"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useAuth from "@/store/AuthStore";
import FragList from "@/components/frags/FragList";
import FragOrder from "@/components/frags/FragOrder";
import FragFilter from "@/components/frags/FragFilter";
import SearchInput from "@/components/SearchInput";
import Link from "next/link";

export default function FragsPage() {
  const [order, setOrder] = useState<"latest" | "alphabet" | "member">(
    "latest",
  );
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "member" | "admin">("all");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const router = useRouter();

  const user = useAuth.use.user();

  useEffect(() => {
    if (!queryClient.isMutating({ mutationKey: ["refresh"] }) && !user) {
      router.push("/login");
    }
  }, [user, queryClient]);

  return (
    <div className="flex flex-col items-center gap-12">
      <section className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <SearchInput search={search} setSearch={setSearch} />
          <FragOrder order={order} setOrder={setOrder} />
        </div>
        <hr className="w-full border border-slate-700" />
        <FragFilter filter={filter} setFilter={setFilter} />
      </section>
      <FragList searchOption={{ order, search, filter }} />
      <Link
        className="fixed bottom-10 left-10 rounded-2xl bg-slate-900 p-4 text-slate-500 shadow-2xl hover:text-green-400"
        href={"/frags/new"}
      >
        + 새 FRAG 만들기
      </Link>
    </div>
  );
}
