import FragEditForm from "@/components/frags/FragEditForm";

export default function FragManagePage({
  params,
}: {
  params: { fragId: string };
}) {
  const fragId = Number(params.fragId);

  return <FragEditForm fragId={fragId} />;
}
