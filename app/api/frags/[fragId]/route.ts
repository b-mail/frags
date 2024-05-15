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

  if (!frag) {
    return NextResponse.json(
      { message: "해당 FRAG이 존재하지 않습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json(frag);
}
