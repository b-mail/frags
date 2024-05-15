import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import * as crypto from "node:crypto";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password, bio } = body;

  const isValid = name && email && password;
  if (!isValid) {
    return NextResponse.json(
      {
        message: "필수 정보가 제공되지 않았습니다.",
      },
      { status: 400 },
    );
  }

  const isExistingName = await prisma.user.findUnique({
    where: { name },
  });

  if (isExistingName) {
    return NextResponse.json(
      {
        message: "이미 사용 중인 이름입니다.",
      },
      { status: 400 },
    );
  }

  const isExistingEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (isExistingEmail) {
    return NextResponse.json(
      {
        message: "이미 사용 중인 이메일 주소입니다.",
      },
      { status: 400 },
    );
  }

  const newUser = await prisma.user.create({
    data: { name, email, bio },
  });

  const salt = crypto.randomBytes(64).toString("base64");

  const digest = crypto
    .createHash("sha512")
    .update(password + salt)
    .digest("hex");

  await prisma.password.create({
    data: {
      userId: newUser.id,
      salt,
      digest,
    },
  });

  return NextResponse.json(
    { message: "회원가입이 완료되었습니다." },
    { status: 201 },
  );
}
