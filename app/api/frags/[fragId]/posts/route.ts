import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateAccessToken } from "@/lib/validateToken";

export async function GET(
  req: NextRequest,
  { params }: { params: { fragId: string } },
) {
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

  const fragId = Number(params.fragId);

  const isMember = await prisma.userFragLink.findFirst({
    where: {
      userId: user.id,
      fragId,
    },
  });

  if (!isMember) {
    return NextResponse.json(
      { message: "해당 FRAG의 멤버가 아닙니다." },
      { status: 401 },
    );
  }

  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");
  const order = req.nextUrl.searchParams.get("order");
  const search = req.nextUrl.searchParams.get("search");

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
    case "like":
      orderBy = {
        likes: {
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

  const count = await prisma.post.count({
    where: {
      AND: [
        {
          fragId,
        },
        search
          ? {
              OR: [
                {
                  title: {
                    contains: search,
                  },
                },
                {
                  content: {
                    contains: search,
                  },
                },
                {
                  user: {
                    name: {
                      contains: search,
                    },
                  },
                },
              ],
            }
          : { fragId },
      ],
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      AND: [
        {
          fragId,
        },
        search
          ? {
              OR: [
                {
                  title: {
                    contains: search,
                  },
                },
                {
                  content: {
                    contains: search,
                  },
                },
              ],
            }
          : { fragId },
      ],
    },
    orderBy,
    skip: Number(page) * Number(limit),
    take: Number(limit),
  });

  const hasNextPage = count > Number(page) * Number(limit) + Number(limit);
  const nextPage = hasNextPage ? Number(page) + 1 : null;

  return NextResponse.json({ result: posts, count, hasNextPage, nextPage });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { fragId: string } },
) {
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

  const fragId = Number(params.fragId);

  const isMember = await prisma.userFragLink.findFirst({
    where: {
      userId: user.id,
      fragId,
    },
  });

  if (!isMember) {
    return NextResponse.json(
      { message: "해당 FRAG의 멤버가 아닙니다." },
      { status: 401 },
    );
  }

  const body = await req.json();
  const { title, content } = body;

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      fragId,
      userId: user.id,
    },
  });

  return NextResponse.json(
    {
      message: "게시글 작성이 완료되었습니다.",
      result: newPost,
    },
    { status: 201 },
  );
}
