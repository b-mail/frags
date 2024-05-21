import FragManageBar from "@/components/frags/FragManageBar";
import { ReactNode } from "react";
import { Metadata } from "next";
import prisma from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: { fragId: string };
}): Promise<Metadata> {
  "use server";
  const fragId = Number(params.fragId);
  const frag = await prisma.frag.findUnique({
    where: { id: fragId },
    select: { name: true },
  });

  return {
    title: `${frag?.name} - 관리 | FRAGS`,
  };
}
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
