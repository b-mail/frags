"use client";

import { ReactNode, useEffect } from "react";
import useAuth from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useAuth.use.user();

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user && !queryClient.isMutating({ mutationKey: ["refresh"] })) {
      router.push("/login");
    }
  }, [user, router, queryClient]);

  return children;
}
