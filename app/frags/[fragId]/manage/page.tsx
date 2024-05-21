import FragEditForm from "@/components/frags/FragEditForm";
import FragDeleteForm from "@/components/frags/FragDeleteForm";

export default function FragManagePage({
  params,
}: {
  params: { fragId: string };
}) {
  const fragId = Number(params.fragId);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <FragEditForm fragId={fragId} />
      <FragDeleteForm fragId={fragId} />
    </div>
  );
}
