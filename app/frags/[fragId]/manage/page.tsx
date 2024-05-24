import FragEditForm from "@/components/frags/FragEditForm";
import FragDeleteForm from "@/components/frags/FragDeleteForm";

export default function FragManagePage({
  params: { fragId },
}: {
  params: { fragId: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <FragEditForm fragId={fragId} />
      <FragDeleteForm fragId={fragId} />
    </div>
  );
}
