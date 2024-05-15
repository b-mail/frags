import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import * as crypto from "node:crypto";
import { createAccessToken, createRefreshToken } from "@/lib/createToken";
import { loginSchema } from "@/lib/schema";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    loginSchema.parse(body);
  } catch (error) {
    return NextResponse.json(
      { message: "입력한 정보가 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const { email, password } = body;

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

  const isPasswordValid = digest === passwordData.digest;

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        message: "비밀번호가 일치하지 않습니다.",
      },
      { status: 400 },
    );
  }

  const payload = {
    uid: user.id,
    iat: Date.now(),
    key: Math.floor(Math.random() * 100),
  };

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  await prisma.refreshToken.upsert({
    where: { userId: user.id },
    update: { token: refreshToken },
    create: {
      token: refreshToken,
      userId: user.id,
    },
  });

  return NextResponse.json(
    {
      message: "로그인이 완료되었습니다.",
      user,
      accessToken,
    },
    {
      headers: {
        "Set-Cookie": `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Strict`,
      },
    },
  );
}
