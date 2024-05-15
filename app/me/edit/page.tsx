"use client";

import UserEditForm from "@/components/me/UserEditForm";
import useAuth from "@/store/AuthStore";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function UserEditPage() {
  const user = useAuth.use.user();

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
