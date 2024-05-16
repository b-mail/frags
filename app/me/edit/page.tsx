"use client";

import useAuth from "@/store/AuthStore";
import UserEditForm from "@/components/users/UserEditForm";
import LoadingContainer from "@/components/ui/LoadingContainer";

export default function UserEditPage() {
  const user = useAuth.use.user();

  return (
    <LoadingContainer isLoading={!user} message={"유저 정보 불러오는 중"}>
      <UserEditForm user={user} />
    </LoadingContainer>
  );
}
