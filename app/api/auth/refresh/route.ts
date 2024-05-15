import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyRefreshToken } from "@/lib/verifyToken";
import { createAccessToken } from "@/lib/createToken";

export async function GET(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken");

  if (!refreshToken) {
    return NextResponse.json(
      {
        message: "로그인되지 않은 사용자입니다.",
      },
      { status: 401 },
    );
  }

  const decoded = verifyRefreshToken(refreshToken.value);

  if (!decoded.isValid) {
    return NextResponse.json(
      {
        message: decoded.error,
      },
      {
        status: 409,
        headers: {
          "Set-Cookie": "refreshToken=; Path=/; HttpOnly; Max-Age=0",
        },
      },
    );
  }

  const user = await prisma.refreshToken
    .findUnique({
      where: { token: refreshToken.value },
    })
    .user();

  if (!user) {
    return NextResponse.json(
      {
        message: "해당 사용자가 존재하지 않습니다.",
      },
      {
        status: 401,
        headers: {
          "Set-Cookie": "refreshToken=; Path=/; HttpOnly; Max-Age=0",
        },
      },
    );
  }

  const payload = {
    uid: user.id,
    iat: Date.now(),
  };

  const accessToken = createAccessToken(payload);

  return NextResponse.json(
    {
      message: "토큰이 갱신되었습니다.",
      user,
      accessToken,
    },
    {
      headers: {
        "Set-Cookie": `refreshToken=${refreshToken.value}; Path=/; HttpOnly; SameSite=Strict`,
      },
    },
  );
}
