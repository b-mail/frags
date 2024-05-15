import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticate } from "@/lib/autheticate";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { commentId: string } },
) {
  const user = await authenticate(req);
  if (user instanceof NextResponse) {
    return user;
  }

  const commentId = Number(params.commentId);

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
