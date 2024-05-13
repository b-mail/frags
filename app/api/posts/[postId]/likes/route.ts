import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateAccessToken } from "@/lib/validateToken";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  const postId = Number(params.postId);

  const likes = await prisma.like.findMany({
    where: {
      postId,
      isActive: true,
    },
  });

  return NextResponse.json(likes);
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

  const isLike = await prisma.like.findFirst({
    where: {
      userId: user.id,
      postId,
    },
  });

  if (isLike) {
    if (isLike.isActive) {
      return NextResponse.json(
        { message: "이미 좋아요를 누르셨습니다." },
        { status: 400 },
      );
    } else {
      await prisma.like.update({
        where: {
          id: isLike.id,
        },
        data: {
          isActive: true,
        },
      });

      return NextResponse.json({ message: "좋아요 누르기에 성공했습니다." });
    }
  }

  const like = await prisma.like.create({
    data: {
      userId: user.id,
      postId,
      isActive: true,
    },
  });

  return NextResponse.json({ message: "좋아요 누르기에 성공했습니다." });
}

export async function DELETE(
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

  const isLike = await prisma.like.findFirst({
    where: {
      userId: user.id,
      postId,
    },
  });

  if (!isLike || !isLike.isActive) {
    return NextResponse.json(
      { message: "좋아요를 누르지 않았습니다." },
      { status: 400 },
    );
  }

  await prisma.like.update({
    where: {
      id: isLike.id,
    },
    data: {
      isActive: false,
    },
  });

  return NextResponse.json({ message: "좋아요 취소에 성공했습니다." });
}
