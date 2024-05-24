import FragManageBar from "@/components/frags/FragManageBar";
import { ReactNode } from "react";
import { Metadata } from "next";
import prisma from "@/lib/db";

export async function generateMetadata({
  params: { fragId },
}: {
  params: { fragId: string };
}): Promise<Metadata> {
  "use server";
  const frag = await prisma.frag.findUnique({
    where: { id: fragId },
    select: { name: true },
  });

  return {
    title: `${frag?.name} - 관리 | FRAGS`,
  };
}
export default function FragManageLayout({
  params: { fragId },
  children,
}: {
  params: { fragId: string };
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <FragManageBar fragId={fragId} />
      {children}
    </div>
  );
}
