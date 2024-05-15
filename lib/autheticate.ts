import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/verifyToken";
import prisma from "@/lib/db";

export async function authenticate(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  const decoded = verifyAccessToken(token);

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

  return user;
}

export async function authenticateByFragId(req: NextRequest, fragId: number) {
  const user = await authenticate(req);

  if (user instanceof NextResponse) {
    return user;
  }

  const isMember = await prisma.userFragLink.findFirst({
    where: {
      userId: user.id,
      fragId,
    },
  });

  if (!isMember) {
    return NextResponse.json(
      { message: "해당 FRAG의 멤버가 아닙니다." },
      { status: 401 },
    );
  }

  return user;
}

export async function authenticateBYPostId(req: NextRequest, postId: number) {
  const user = await authenticate(req);

  if (user instanceof NextResponse) {
    return user;
  }

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

  return user;
}
