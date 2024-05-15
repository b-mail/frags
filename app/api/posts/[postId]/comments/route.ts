import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateBYPostId } from "@/lib/autheticate";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  const postId = Number(params.postId);

  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
  });

  return NextResponse.json(comments);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  const postId = Number(params.postId);

  const user = await authenticateBYPostId(req, postId);
  if (user instanceof NextResponse) {
    return user;
  }

  const { content } = await req.json();

  const newComment = await prisma.comment.create({
    data: {
      content,
      userId: user.id,
      postId,
    },
  });

  return NextResponse.json(newComment, { status: 201 });
}
