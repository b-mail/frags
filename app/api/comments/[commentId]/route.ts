import { NextRequest, NextResponse } from "next/server";
import { validateAccessToken } from "@/lib/validateToken";
import prisma from "@/lib/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { commentId: string } },
) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  const decoded = validateAccessToken(token);

  if (!decoded.isValid) {
    return NextResponse.json(
      { message: "유효하지 않은 토큰입니다." },
      { status: 401 },
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.uid,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "해당 사용자가 존재하지 않습니다." },
      { status: 401 },
    );
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
