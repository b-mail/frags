import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateByPostId } from "@/lib/autheticate";

export async function GET({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const likes = await prisma.like.findMany({
    where: {
      postId,
      isActive: true,
    },
  });

  return NextResponse.json({ result: likes });
}

export async function POST(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } },
) {
  const user = await authenticateByPostId(req, postId);
  if (user instanceof NextResponse) {
    return user;
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

  await prisma.like.create({
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
  { params: { postId } }: { params: { postId: string } },
) {
  const user = await authenticateByPostId(req, postId);
  if (user instanceof NextResponse) {
    return user;
  }

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
