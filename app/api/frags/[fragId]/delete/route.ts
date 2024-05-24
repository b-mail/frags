import { NextRequest, NextResponse } from "next/server";
import { authenticateByFragId } from "@/lib/autheticate";
import prisma from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params: { fragId } }: { params: { fragId: string } },
) {

  const user = await authenticateByFragId(req, fragId);
  if (user instanceof NextResponse) {
    return user;
  }

  const frag = await prisma.frag.findUnique({
    where: {
      id: fragId,
    },
  });

  if (!frag) {
    return NextResponse.json(
      { message: "존재하지 않는 FRAG입니다." },
      { status: 404 },
    );
  }

  if (frag.adminId !== user.id) {
    return NextResponse.json(
      { message: "해당 FRAG의 관리자가 아닙니다." },
      { status: 403 },
    );
  }

  const body = await req.json();
  const { name } = body;

  if (frag.name !== name) {
    return NextResponse.json(
      { message: "FRAG 이름이 일치하지 않습니다." },
      { status: 400 },
    );
  }

  const posts = await prisma.post.findMany({
    where: {
      fragId,
    },
  });

  for (const post of posts) {
    await prisma.like.deleteMany({
      where: {
        postId: post.id,
      },
    });
    await prisma.comment.deleteMany({
      where: {
        postId: post.id,
      },
    });
    await prisma.post.delete({
      where: {
        id: post.id,
      },
    });
  }

  await prisma.userFragLink.deleteMany({
    where: {
      fragId,
    },
  });

  await prisma.frag.delete({
    where: {
      id: fragId,
    },
  });

  return NextResponse.json({ result: "FRAG이 성공적으로 삭제되었습니다." });
}
