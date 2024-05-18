import { NextRequest, NextResponse } from "next/server";
import { authenticateByUserId } from "@/lib/autheticate";
import prisma from "@/lib/db";
import crypto from "node:crypto";

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const userId = Number(params.userId);

  const user = await authenticateByUserId(req, userId);
  if (user instanceof NextResponse) {
    return user;
  }

  const body = await req.json();
  const { email, password } = body;

  if (user.email !== email) {
    return NextResponse.json(
      { message: "이메일 주소가 일치하지 않습니다." },
      { status: 400 },
    );
  }

  const passwordData = await prisma.password.findUnique({
    where: {
      userId,
    },
  });

  if (!passwordData) {
    return NextResponse.json(
      { message: "비밀번호가 일치하지 않습니다." },
      { status: 401 },
    );
  }

  const digest = crypto
    .createHash("sha512")
    .update(password + passwordData.salt)
    .digest("hex");

  const isPasswordValid = digest === passwordData.digest;

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        message: "비밀번호가 일치하지 않습니다.",
      },
      { status: 400 },
    );
  }

  await prisma.like.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.comment.deleteMany({
    where: {
      userId,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      userId,
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

  const frags = await prisma.frag.findMany({
    where: {
      adminId: userId,
    },
  });

  for (const frag of frags) {
    await prisma.userFragLink.deleteMany({
      where: {
        id: frag.id,
      },
    });
  }

  await prisma.userFragLink.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.frag.deleteMany({
    where: {
      adminId: userId,
    },
  });

  await prisma.refreshToken.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.password.delete({
    where: {
      userId,
    },
  });

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return NextResponse.json(
    { message: "사용자 정보가 삭제되었습니다." },
    {
      status: 200,
      headers: {
        "Set-Cookie":
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly",
      },
    },
  );
}
