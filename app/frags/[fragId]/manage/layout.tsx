import FragManageBar from "@/components/frags/FragManageBar";
import { ReactNode } from "react";
import { Metadata } from "next";
import prisma from "@/lib/db";

export async function generateMetadata(props: {
  params: Promise<{ fragId: string }>;
}): Promise<Metadata> {
  "use server";
  const params = await props.params;
  const { fragId } = params;

  const frag = await prisma.frag.findUnique({
    where: { id: fragId },
    select: { name: true },
  });

  return {
    title: `${frag?.name} - 관리 | FRAGS`,
  };
}
export default async function FragManageLayout(props: {
  params: Promise<{ fragId: string }>;
  children: ReactNode;
}) {
  const params = await props.params;
  const { fragId } = params;
  const { children } = props;
  return (
    <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-10">
      <FragManageBar fragId={fragId} />
      {children}
    </div>
  );
}
