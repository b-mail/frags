import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ userId: string }> },
) {
  const params = await props.params;
  const { userId } = params;
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

  return NextResponse.json({ result: user });
}
