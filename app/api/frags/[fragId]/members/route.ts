import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticate } from "@/lib/autheticate";

export async function GET(
  req: NextRequest,
  { params: { fragId } }: { params: { fragId: string } }
) {
  const members = await prisma.user.findMany({
    where: {
      joinedFrags: {
        some: {
          fragId
        }
      }
    }
  });

  return NextResponse.json({ result: members });
}

export async function POST(
  req: NextRequest,
  { params: { fragId } }: { params: { fragId: string } }
) {
  const user = await authenticate(req);
  if (user instanceof NextResponse) {
    return user;
  }

  await prisma.userFragLink.create({
    data: {
      fragId,
      userId: user.id
    }
  });

  return NextResponse.json({ message: "성공적으로 가입되었습니다." });
}
