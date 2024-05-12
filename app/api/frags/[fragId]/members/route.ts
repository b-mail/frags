import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateAccessToken } from "@/lib/validateToken";

export async function GET(
  req: NextRequest,
  { params }: { params: { fragId: string } },
) {
  const fragId = Number(params.fragId);

  const members = await prisma.user.findMany({
    where: {
      joinedFrags: {
        some: {
          fragId,
        },
      },
    },
  });

  return NextResponse.json({ result: members });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { fragId: string } },
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

  const fragId = Number(params.fragId);

  await prisma.userFragLink.create({
    data: {
      fragId,
      userId: user.id,
    },
  });

  return NextResponse.json({ message: "성공적으로 가입되었습니다." });
}
