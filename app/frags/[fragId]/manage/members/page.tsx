import MemberManageList from "@/components/frags/MemberManageList";

export default async function FragMemberManagePage(props: {
  params: Promise<{ fragId: string }>;
}) {
  const params = await props.params;
  const { fragId } = params;
  return (
    <div className="flex w-full flex-col gap-6">
      <h2 className="flex items-center gap-2 text-2xl font-bold">
        <svg
          className="h-6 w-6 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
        멤버 관리
      </h2>
      <MemberManageList fragId={fragId} />
    </div>
  );
}
