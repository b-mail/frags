import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateByPostId } from "@/lib/autheticate";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  const postId = Number(params.postId);

  const user = await authenticateByPostId(req, postId);

  if (user instanceof NextResponse) {
    return user;
  }

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  const postId = Number(params.postId);

  const user = await authenticateByPostId(req, postId);
  if (user instanceof NextResponse) {
    return user;
  }

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

  if (Number(post.userId) !== Number(user.id)) {
    return NextResponse.json(
      { message: "게시글 작성자가 아닙니다." },
      { status: 401 },
    );
  }

  await prisma.like.deleteMany({
    where: { postId },
  });

  await prisma.comment.deleteMany({
    where: { postId },
  });

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return NextResponse.json({ message: "게시글이 삭제되었습니다." });
}
