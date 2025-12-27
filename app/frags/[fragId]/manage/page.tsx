import FragEditForm from "@/components/frags/FragEditForm";
import FragDeleteForm from "@/components/frags/FragDeleteForm";

export default async function FragManagePage(props: {
  params: Promise<{ fragId: string }>;
}) {
  const params = await props.params;
  const { fragId } = params;
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <FragEditForm fragId={fragId} />
      <FragDeleteForm fragId={fragId} />
    </div>
  );
}
