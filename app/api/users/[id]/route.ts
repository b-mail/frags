import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "해당 사용자를 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json(user);
}
