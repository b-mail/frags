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

  const posts = await prisma.post.findMany({
    where: {
      fragId,
      userId: memberId,
    },
  });

  return NextResponse.json({ result: posts });
}
