import MemberManageList from "@/components/frags/MemberManageList";

export default function FragMemberManagePage({
  params: { fragId },
}: {
  params: { fragId: string };
}) {
  return <MemberManageList fragId={fragId} />;
}
