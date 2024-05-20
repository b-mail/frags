import { NextRequest, NextResponse } from "next/server";
import { authenticateByFragId } from "@/lib/autheticate";
import prisma from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { fragId: string; memberId: string } },
) {
  const fragId = Number(params.fragId);
  const memberId = Number(params.memberId);

  const user = await authenticateByFragId(req, fragId);
  if (user instanceof NextResponse) {
    return user;
  }

  const comments = await prisma.comment.findMany({
    where: {
      post: {
        fragId,
      },
      userId: memberId,
    },
  });

  return NextResponse.json({ result: comments });
}
