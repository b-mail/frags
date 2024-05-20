import FragManageBar from "@/components/frags/FragManageBar";
import { ReactNode } from "react";

export default function FragManageLayout({
  params,
  children,
}: {
  params: { fragId: string };
  children: ReactNode;
}) {
  const fragId = Number(params.fragId);
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <FragManageBar fragId={fragId} />
      {children}
    </div>
  );
}
