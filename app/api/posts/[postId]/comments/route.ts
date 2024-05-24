import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateByPostId } from "@/lib/autheticate";

export async function GET(
  req: NextRequest,
  {
    params: { postId },
  }: {
    params: { postId: string };
  },
) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json({ result: comments });
}

export async function POST(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } },
) {
  const user = await authenticateByPostId(req, postId);
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
