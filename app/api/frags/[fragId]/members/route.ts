import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticate } from "@/lib/autheticate";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ fragId: string }> },
) {
  const params = await props.params;
  const { fragId } = params;

  // 1. 해당 Frag 정보를 가져옴 (adminId 확인용)
  const frag = await prisma.frag.findUnique({
    where: { id: fragId },
  });

  if (!frag) {
    return NextResponse.json(
      { message: "해당 FRAG이 존재하지 않습니다." },
      { status: 404 },
    );
  }

  // 2. 가입한 멤버들과 관리자를 모두 가져옴
  const members = await prisma.user.findMany({
    where: {
      OR: [
        {
          joinedFrags: {
            some: { fragId },
          },
        },
        { id: frag.adminId },
      ],
    },
  });

  return NextResponse.json({ result: members });
}

export async function POST(
  req: NextRequest,
  props: { params: Promise<{ fragId: string }> },
) {
  const params = await props.params;
  const { fragId } = params;
  const user = await authenticate(req);
  if (user instanceof NextResponse) {
    return user;
  }

  await prisma.userFragLink.create({
    data: {
      fragId,
      userId: user.id,
    },
  });

  return NextResponse.json({ message: "성공적으로 가입되었습니다." });
}
