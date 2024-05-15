import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateByFragId } from "@/lib/autheticate";

export async function GET(
  req: NextRequest,
  { params }: { params: { fragId: string } },
) {
  const fragId = Number(params.fragId);

  const user = await authenticateByFragId(req, fragId);
  if (user instanceof NextResponse) {
    return user;
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
    orderBy: {
      createdAt: "desc",
    },
    include: {
      likes: {
        where: {
          isActive: true,
        },
        select: {
          id: true,
        },
      },
    },
    skip: Number(page) * Number(limit),
    take: Number(limit),
  });

  const hasNextPage = count > Number(page) * Number(limit) + Number(limit);
  const nextPage = hasNextPage ? Number(page) + 1 : null;

  if (order === "like") {
    posts.sort((a, b) => {
      return b.likes.length - a.likes.length;
    });
  }

  return NextResponse.json({ result: posts, count, hasNextPage, nextPage });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { fragId: string } },
) {
  const fragId = Number(params.fragId);

  const user = await authenticateByFragId(req, fragId);
  if (user instanceof NextResponse) {
    return user;
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
