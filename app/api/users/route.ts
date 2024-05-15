import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import * as crypto from "node:crypto";
import { registerSchema } from "@/lib/schema";
import { authenticate } from "@/lib/autheticate";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    registerSchema.parse(body);
  } catch (error) {
    return NextResponse.json(
      { message: "입력한 정보가 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const { name, email, password, bio } = body;

  const isExistingName = await prisma.user.findUnique({
    where: { name },
  });

  if (isExistingName) {
    return NextResponse.json(
      {
        message: "이미 사용 중인 이름입니다.",
      },
      { status: 409 },
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
      { status: 409 },
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

export async function PUT(req: NextRequest) {
  const user = await authenticate(req);
  if (user instanceof NextResponse) {
    return user;
  }

  const body = await req.json();

  try {
    registerSchema.parse(body);
  } catch (error) {
    return NextResponse.json(
      { message: "입력한 정보가 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const { name, email, password, bio } = body;

  const passwordData = await prisma.password.findUnique({
    where: { userId: user.id },
  });

  if (!passwordData) {
    return NextResponse.json(
      {
        message: "비밀번호가 일치하지 않습니다.",
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

  const isExistingName = await prisma.user.findUnique({
    where: { name },
  });

  if (isExistingName && isExistingName.id !== user.id) {
    return NextResponse.json(
      {
        message: "이미 사용 중인 이름입니다.",
      },
      { status: 409 },
    );
  }

  const isExistingEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (isExistingEmail && isExistingEmail.id !== user.id) {
    return NextResponse.json(
      {
        message: "이미 사용 중인 이메일 주소입니다.",
      },
      { status: 409 },
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { name, email, bio },
  });

  return NextResponse.json(
    { message: "회원정보가 수정되었습니다.", user: updatedUser },
    { status: 200 },
  );
}
