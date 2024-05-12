import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  const postId = Number(params.postId);

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  return NextResponse.json(post);
}
