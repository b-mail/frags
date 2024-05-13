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

  if (!post) {
    return NextResponse.json(
      { message: "해당 게시글이 존재하지 않습니다." },
      { status: 404 },
    );
  }

  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      view: {
        increment: 1,
      },
    },
  });

  return NextResponse.json(post);
}
