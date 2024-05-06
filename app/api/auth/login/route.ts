import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import * as crypto from "node:crypto";
import { createAccessToken, createRefreshToken } from "@/lib/createToken";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  const isValid = email && password;
  if (!isValid) {
    return NextResponse.json(
      {
        message: "필수 정보가 제공되지 않았습니다.",
      },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "등록되지 않은 이메일 주소입니다.",
      },
      { status: 400 },
    );
  }

  const passwordData = await prisma.password.findUnique({
    where: { userId: user.id },
  });

  if (!passwordData) {
    return NextResponse.json(
      {
        message: "비밀번호가 등록되지 않았습니다.",
      },
      { status: 400 },
    );
  }

  const digest = crypto
    .createHash("sha512")
    .update(password + passwordData.salt)
    .digest("hex");

  if (digest === passwordData.digest) {
    const accessToken = createAccessToken({ uid: user.id });
    const refreshToken = createRefreshToken({ uid: user.id });

    return NextResponse.json(
      {
        message: "로그인이 완료되었습니다.",
        user,
        accessToken,
      },
      {
        headers: {
          "Set-Cookie": `refreshToken=${refreshToken}; HttpOnly; SameSite=Strict; Path=/;`,
        },
      },
    );
  } else {
    return NextResponse.json(
      {
        message: "비밀번호가 일치하지 않습니다.",
      },
      { status: 400 },
    );
  }
}
