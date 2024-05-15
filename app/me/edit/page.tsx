"use client";

import UserEditForm from "@/components/me/UserEditForm";
import useAuth from "@/store/AuthStore";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function UserEditPage() {
  const user = useAuth.use.user();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (!user && !queryClient.isMutating({ mutationKey: ["refresh"] })) {
      router.push("/login");
    }
  }, [user, queryClient, router]);

  if (!user) {
    return (
      <div style={{ width: "48rem" }}>
        <LoadingIndicator message="사용자 정보를 불러오는 중" />
      </div>
    );
  } else {
    return <UserEditForm user={user} />;
  }
}
