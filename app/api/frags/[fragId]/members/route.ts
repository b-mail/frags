import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticate } from "@/lib/autheticate";

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
  const user = await authenticate(req);
  if (user instanceof NextResponse) {
    return user;
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
