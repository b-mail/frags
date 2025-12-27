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

    const cookieStore = await cookies();
    const viewCookieName = `viewed_post_${postId}`;
    const hasViewed = cookieStore.get(viewCookieName);

    if (hasViewed) {
      return NextResponse.json(
        { message: "Already viewed", viewed: true },
        { status: 200 },
      );
    }

    await prisma.post.update({
      where: { id: postId },
      data: {
        view: { increment: 1 },
      },
    });

    const response = NextResponse.json(
      { message: "View count incremented", viewed: false },
      { status: 200 },
    );

    response.cookies.set(viewCookieName, "true", {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
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
