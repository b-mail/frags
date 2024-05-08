import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateAccessToken, validateRefreshToken } from "@/lib/validateToken";
import { createAccessToken } from "@/lib/createToken";

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get("Authorization")?.split(" ")[1];
  const refreshToken = req.headers.get("Refresh-Token")?.split(" ")[1];

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      {
        message: "토큰이 제공되지 않았습니다.",
      },
      { status: 401 },
    );
  }

  const decodedAccessToken = validateAccessToken(accessToken);

  if (!decodedAccessToken.isValid) {
    return NextResponse.json(
      {
        message: decodedAccessToken.error,
      },
      { status: 401 },
    );
  }

  const targetRefreshToken = await prisma.user
    .findUnique({
      where: { id: decodedAccessToken.uid },
    })
    .RefreshToken();

  if (!targetRefreshToken) {
    return NextResponse.json(
      {
        message: "로그인되지 않은 사용자입니다.",
      },
      { status: 401 },
    );
  }

  const isRefreshTokenValid = targetRefreshToken.token === refreshToken;

  if (!isRefreshTokenValid) {
    return NextResponse.json(
      {
        message: "유효하지 않은 토큰입니다.",
      },
      { status: 401 },
    );
  }

  const decodedRefreshToken = validateRefreshToken(targetRefreshToken.token);

  if (!decodedRefreshToken.isValid) {
    await prisma.refreshToken.delete({
      where: { id: targetRefreshToken.id },
    });

    return NextResponse.json(
      {
        message: decodedRefreshToken.error,
      },
      { status: 401 },
    );
  }

  const payload = {
    uid: decodedAccessToken.uid as number,
    iat: Date.now(),
  };

  const newAccessToken = createAccessToken(payload);

  return NextResponse.json({ accessToken: newAccessToken });
}
