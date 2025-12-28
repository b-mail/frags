import FragEditForm from "@/components/frags/FragEditForm";
import FragDeleteForm from "@/components/frags/FragDeleteForm";

export default async function FragManagePage(props: {
  params: Promise<{ fragId: string }>;
}) {
  const params = await props.params;
  const { fragId } = params;
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <div className="w-full">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          FRAG 정보 수정
        </h2>
        <FragEditForm fragId={fragId} />
      </div>
      <div className="w-full">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-red-400">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          FRAG 삭제
        </h2>
        <FragDeleteForm fragId={fragId} />
      </div>
    </div>
  );
}
