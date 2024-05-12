import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  const postId = Number(params.postId);

  const likes = await prisma.like.findMany({
    where: {
      postId,
    },
  });

  return NextResponse.json(likes);
}
