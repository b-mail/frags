import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateByFragId } from "@/lib/autheticate";

export async function GET(
  req: NextRequest,
  { params }: { params: { fragId: string } },
) {
  const fragId = Number(params.fragId);

  const frag = await prisma.frag.findUnique({
    where: {
      id: fragId,
    },
  });

  if (!frag) {
    return NextResponse.json(
      { message: "해당 FRAG이 존재하지 않습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json({ result: frag });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { fragId: string } },
) {
  const fragId = Number(params.fragId);

  const user = await authenticateByFragId(req, fragId);
  if (user instanceof NextResponse) {
    return user;
  }

  const frag = await prisma.frag.findUnique({
    where: {
      id: fragId,
    },
  });

  if (!frag) {
    return NextResponse.json(
      { message: "해당 FRAG이 존재하지 않습니다." },
      { status: 404 },
    );
  }

  if (frag.adminId !== user.id) {
    return NextResponse.json(
      { message: "FRAG 관리자만 FRAG 정보를 수정할 수 있습니다." },
      { status: 403 },
    );
  }

  const body = await req.json();
  const { name, description } = body;

  const isExist = await prisma.frag.findUnique({
    where: {
      name,
    },
  });

  if (isExist && isExist.id !== fragId) {
    return NextResponse.json(
      { message: "이미 존재하는 FRAG 이름입니다." },
      { status: 409 },
    );
  }

  const updatedFrag = await prisma.frag.update({
    where: {
      id: fragId,
    },
    data: {
      name,
      description,
    },
  });

  return NextResponse.json({ result: updatedFrag });
}
