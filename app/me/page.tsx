"use client";

import Profile from "@/components/users/Profile";
import useAuth from "@/store/AuthStore";
import LoadingContainer from "@/components/ui/LoadingContainer";

export default function MyPage() {
  const user = useAuth.use.user();

  return (
    <LoadingContainer isLoading={!user} message={"유저 정보 불러오는 중"}>
      <Profile user={user} />
    </LoadingContainer>
  );
}
