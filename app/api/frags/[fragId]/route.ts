import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { fragId: string } },
) {
  const fragId = Number(params.fragId);

  const frag = await prisma.frag.findUnique({
    where: {
      id: fragId,
    },
  });

  return NextResponse.json(frag);
}
