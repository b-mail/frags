import { NextRequest, NextResponse } from "next/server";
import { validateAccessToken } from "@/lib/validateToken";
import prisma from "@/lib/db";
import { Frag } from "@prisma/client";

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

  let orderBy = {};

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

  const count = await prisma.frag.count({
    where: search
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
      : undefined,
  });

  let frags: Frag[] = [];

  if (member) {
    frags = await prisma.frag.findMany({
      where: {
        members: {
          some: {
            userId: Number(member),
          },
        },
        OR: search
          ? [
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
            ]
          : undefined,
      },
      take: Number(limit),
      skip: Number(page) * Number(limit),
      orderBy,
    });
  } else if (admin) {
    frags = await prisma.frag.findMany({
      where: {
        adminId: Number(admin),
        OR: search
          ? [
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
            ]
          : undefined,
      },
      take: Number(limit),
      skip: Number(page) * Number(limit),
      orderBy,
    });
  } else {
    frags = await prisma.frag.findMany({
      take: Number(limit),
      skip: Number(page) * Number(limit),
      orderBy,
      where: search
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
        : undefined,
    });
  }

  const hasNextPage = count > Number(page) * Number(limit) + Number(limit);
  const nextPage = hasNextPage ? Number(page) + 1 : null;

  return NextResponse.json({
    result: frags,
    count,
    hasNextPage,
    nextPage,
  });
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  const decoded = validateAccessToken(token);

  if (!decoded.isValid) {
    return NextResponse.json(
      { message: "유효하지 않은 토큰입니다." },
      { status: 401 },
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.uid,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "해당 사용자가 존재하지 않습니다." },
      { status: 401 },
    );
  }
  const body = await req.json();
  const { name, description } = body;

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
}
