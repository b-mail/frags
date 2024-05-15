import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken");

  if (!refreshToken) {
    return NextResponse.json(
      { message: "로그인되지 않은 사용자입니다." },
      { status: 401 },
    );
  }

  await prisma.refreshToken.delete({
    where: { token: refreshToken.value },
  });

  return NextResponse.json(
    { message: "로그아웃이 완료되었습니다." },
    {
      headers: {
        "Set-Cookie": "refreshToken=; Path=/ ; HttpOnly; Max-Age=0",
      },
    },
  );
}
