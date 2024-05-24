import { NextRequest, NextResponse } from "next/server";
import { authenticateByFragId } from "@/lib/autheticate";
import prisma from "@/lib/db";

export async function GET(
  req: NextRequest,
  {
    params: { fragId, memberId },
  }: { params: { fragId: string; memberId: string } },
) {
  const user = await authenticateByFragId(req, fragId);
  if (user instanceof NextResponse) {
    return user;
  }

  const likes = await prisma.like.findMany({
    where: {
      post: {
        fragId,
      },
      userId: memberId,
    },
  });

  return NextResponse.json({ result: likes });
}
