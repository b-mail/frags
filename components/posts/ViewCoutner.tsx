"use client";

import { useEffect, useRef } from "react";
import { incrementPostView } from "@/lib/api"; // 방금 만든 함수 import

export default function ViewCounter({ postId }: { postId: string }) {
  // 요청이 이미 전송되었는지 확인하는 ref
  const hasFetched = useRef(false);

  useEffect(() => {
    // 이미 호출했다면 실행하지 않음 (Strict Mode 중복 호출 방지)
    if (hasFetched.current) return;

    const handleViewCount = async () => {
      try {
        hasFetched.current = true; // 호출 시작 플래그 설정
        await incrementPostView(postId);
      } catch (error) {
        console.error("View count error:", error);
      }
    };

    handleViewCount();
  }, [postId]);

  return null;
}
