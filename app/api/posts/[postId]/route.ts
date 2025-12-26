import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateByPostId } from "@/lib/autheticate";
import { postSchema } from "@/lib/schema";

export async function GET(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } },
) {
  // (주의) GET 요청에 인증이 필요한지 확인하세요.
  // 공개 게시판이라면 authenticateByPostId가 필요 없을 수도 있습니다.
  const user = await authenticateByPostId(req, postId);
  if (user instanceof NextResponse) {
    return user;
  }

  // ★ 변경점: update가 아니라 findUnique로만 데이터를 가져옵니다.
  const post = await prisma.post.findUnique({
    where: {
      id: postId, // schema에서 id가 Int라면 Number(postId) 변환 필요 확인
    },
  });

  if (!post) {
    return NextResponse.json(
      { message: "해당 게시글이 존재하지 않습니다." },
      { status: 404 },
    );
  }

  // update 로직 삭제됨

  return NextResponse.json({ result: post });
}

export async function PUT(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } },
) {
  const user = await authenticateByPostId(req, postId);
  if (user instanceof NextResponse) {
    return user;
  }

  const body = await req.json();
  try {
    postSchema.parse(body);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return NextResponse.json(
      { message: "해당 게시글이 존재하지 않습니다." },
      { status: 404 },
    );
  }

  if (Number(post.userId) !== Number(user.id)) {
    return NextResponse.json(
      { message: "게시글 작성자가 아닙니다." },
      { status: 401 },
    );
  }

  const { title, content } = body;

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      content,
    },
  });

  return NextResponse.json({ result: updatedPost });
}

export async function DELETE(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } },
) {
  const user = await authenticateByPostId(req, postId);
  if (user instanceof NextResponse) {
    return user;
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return NextResponse.json(
      { message: "해당 게시글이 존재하지 않습니다." },
      { status: 404 },
    );
  }

  const frag = await prisma.frag.findUnique({
    where: {
      id: post.fragId,
    },
  });

  if (post.userId === user.id || frag!.adminId === user.id) {
    await prisma.like.deleteMany({
      where: { postId },
    });

    await prisma.comment.deleteMany({
      where: { postId },
    });

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json({ message: "게시글이 삭제되었습니다." });
  } else {
    return NextResponse.json(
      { message: "게시글 작성자 혹은 FRAG 관리자가 아닙니다." },
      { status: 401 },
    );
  }
}
