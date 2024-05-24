import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticate } from "@/lib/autheticate";
import { commentSchema } from "@/lib/schema";

export async function PUT(
  req: NextRequest,
  { params: { commentId } }: { params: { commentId: string } },
) {
  const user = await authenticate(req);
  if (user instanceof NextResponse) {
    return user;
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment) {
    return NextResponse.json(
      { message: "해당 댓글이 존재하지 않습니다." },
      { status: 404 },
    );
  }

  if (comment.userId !== user.id) {
    return NextResponse.json(
      { message: "댓글 작성자가 아닙니다." },
      { status: 401 },
    );
  }

  const body = await req.json();

  try {
    commentSchema.parse(body);
  } catch (error) {
    return NextResponse.json(
      { message: "입력한 정보가 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const { content } = body;

  const updatedComment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
  });

  return NextResponse.json({ result: updatedComment });
}

export async function DELETE(
  req: NextRequest,
  { params: { commentId } }: { params: { commentId: string } },
) {
  const user = await authenticate(req);
  if (user instanceof NextResponse) {
    return user;
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment) {
    return NextResponse.json(
      { message: "해당 댓글이 존재하지 않습니다." },
      { status: 404 },
    );
  }

  if (Number(comment.userId) !== Number(user.id)) {
    return NextResponse.json(
      { message: "댓글 작성자가 아닙니다." },
      { status: 401 },
    );
  }

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return NextResponse.json({ message: "댓글이 삭제되었습니다." });
}
