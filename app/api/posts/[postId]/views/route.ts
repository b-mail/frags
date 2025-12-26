import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const { postId } = await params;

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 },
      );
    }

    // 1. 쿠키 스토어 가져오기
    const cookieStore = await cookies();
    const viewCookieName = `viewed_post_${postId}`;
    const hasViewed = cookieStore.get(viewCookieName);

    // 2. 이미 조회한 경우 (쿠키 존재)
    if (hasViewed) {
      return NextResponse.json(
        { message: "Already viewed", viewed: true },
        { status: 200 },
      );
    }

    // 3. DB 조회수 증가 (Atomic Update)
    await prisma.post.update({
      where: { id: postId },
      data: {
        view: { increment: 1 },
      },
    });

    // 4. 응답 생성 및 쿠키 설정
    const response = NextResponse.json(
      { message: "View count incremented", viewed: false },
      { status: 200 },
    );

    response.cookies.set(viewCookieName, "true", {
      maxAge: 60 * 60 * 24, // 24시간
      httpOnly: true, // 자바스크립트에서 접근 불가 (보안)
      path: "/", // 모든 경로에서 유효
      sameSite: "lax", // CSRF 보호 및 대부분의 브라우저 기본값
      secure: process.env.NODE_ENV === "production", // 배포 환경에서만 HTTPS 적용
    });

    return response;
  } catch (error) {
    console.error("View increment error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
