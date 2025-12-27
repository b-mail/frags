import MemberManageList from "@/components/frags/MemberManageList";

export default async function FragMemberManagePage(props: {
  params: Promise<{ fragId: string }>;
}) {
  const params = await props.params;
  const { fragId } = params;
  return <MemberManageList fragId={fragId} />;
}
