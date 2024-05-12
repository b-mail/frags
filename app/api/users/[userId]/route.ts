import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const userId = Number(params.userId);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "해당 사용자가 존재하지 않습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json(user);
}
