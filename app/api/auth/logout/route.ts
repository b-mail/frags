import { NextRequest, NextResponse } from "next/server";
import { validateAccessToken } from "@/lib/validateToken";
import prisma from "@/lib/db";

export async function DELETE(req: NextRequest) {
  const accessToken = req.headers.get("Authorization")?.split(" ")[1];

  const decoded = validateAccessToken(accessToken as string);

  const userId = decoded.uid;

  await prisma.refreshToken.delete({
    where: { userId },
  });

  return NextResponse.json({ message: "로그아웃되었습니다." });
}
