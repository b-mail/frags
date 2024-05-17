"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/store/AuthStore";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useAuth.use.user();
  const isRefreshing = useAuth.use.isRefreshing();

  const router = useRouter();

  useEffect(() => {
    if (!user && !isRefreshing) {
      router.push("/login");
    }
  }, [user, isRefreshing, router]);

  return children;
}
