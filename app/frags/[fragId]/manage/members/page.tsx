import MemberManageList from "@/components/frags/MemberManageList";

export default function FragMemberManagePage({
  params,
}: {
  params: { fragId: string };
}) {
  const fragId = Number(params.fragId);
  return <MemberManageList fragId={fragId} />;
}
