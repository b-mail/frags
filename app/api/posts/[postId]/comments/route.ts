import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateAccessToken } from "@/lib/validateToken";

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

  const postId = Number(params.postId);

  const isMember = await prisma.post
    .findUnique({
      where: {
        id: postId,
      },
    })
    .frag()
    .members({ where: { id: user.id } });

  if (!isMember) {
    return NextResponse.json(
      { message: "해당 FRAG의 멤버가 아닙니다." },
      { status: 401 },
    );
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
