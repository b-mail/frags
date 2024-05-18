import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticate } from "@/lib/autheticate";
import { fragSchema } from "@/lib/schema";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");
  const order = req.nextUrl.searchParams.get("order");
  const search = req.nextUrl.searchParams.get("search");
  const member = req.nextUrl.searchParams.get("member");
  const admin = req.nextUrl.searchParams.get("admin");

  if (!page || !limit) {
    return NextResponse.json(
      { message: "페이지와 제한을 지정해주세요." },
      { status: 400 },
    );
  }

  let orderBy: {};

  switch (order) {
    case "latest":
      orderBy = {
        createdAt: "desc",
      };
      break;
    case "alphabet":
      orderBy = {
        name: "asc",
      };
      break;
    case "member":
      orderBy = {
        members: {
          _count: "desc",
        },
      };
      break;
    default:
      orderBy = {
        createdAt: "desc",
      };
      break;
  }

  const searchCondition = search
    ? {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      }
    : {};

  const memberCondition = member
    ? {
        members: {
          some: {
            userId: Number(member),
          },
        },
      }
    : {};

  const adminCondition = admin
    ? {
        adminId: Number(admin),
      }
    : {};

  const count = await prisma.frag.count({
    where: {
      ...searchCondition,
      ...memberCondition,
      ...adminCondition,
    },
  });

  const frags = await prisma.frag.findMany({
    where: {
      ...searchCondition,
      ...memberCondition,
      ...adminCondition,
    },
    take: Number(limit),
    skip: Number(page) * Number(limit),
    orderBy,
  });

  const hasNextPage = count > Number(page) * Number(limit) + Number(limit);
  const nextPage = hasNextPage ? Number(page) + 1 : null;

  return NextResponse.json({
    result: frags,
    hasNextPage,
    nextPage,
  });
}

export async function POST(req: NextRequest) {
  const user = await authenticate(req);
  if (user instanceof NextResponse) {
    return user;
  }

  const body = await req.json();
  try {
    fragSchema.parse(body);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }

  const { name, description } = body;
  try {
    const frag = await prisma.frag.create({
      data: {
        name,
        description,
        adminId: user.id,
      },
    });

    await prisma.userFragLink.create({
      data: {
        userId: user.id,
        fragId: frag.id,
      },
    });

    return NextResponse.json(
      {
        message: "FRAG 생성이 완료되었습니다.",
        result: frag,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "해당 이름의 FRAG이 이미 존재합니다." },
      { status: 409 },
    );
  }
}
