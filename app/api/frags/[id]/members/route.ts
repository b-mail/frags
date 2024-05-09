import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  const fragId = Number(params.id);

  const members = await prisma.user.findMany({
    where: {
      joinedFrags: {
        some: {
          fragId,
        },
      },
    },
  });

  return NextResponse.json(members);
}
