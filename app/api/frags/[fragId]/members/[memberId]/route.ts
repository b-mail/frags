import { NextRequest, NextResponse } from "next/server";
import { authenticateByFragId } from "@/lib/autheticate";
import prisma from "@/lib/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { fragId: string; memberId: string } },
) {
  const fragId = Number(params.fragId);
  const memberId = Number(params.memberId);

  const user = await authenticateByFragId(req, fragId);
  if (user instanceof NextResponse) {
    return user;
  }

  const frag = await prisma.frag.findUnique({
    where: {
      id: fragId,
    },
  });

  const isAdmin = user.id === frag?.adminId;

  if (isAdmin || user.id === memberId) {
    await prisma.userFragLink.deleteMany({
      where: {
        userId: memberId,
        fragId,
      },
    });

    return NextResponse.json({ message: "성공적으로 추방되었습니다." });
  } else {
    return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
  }
}
