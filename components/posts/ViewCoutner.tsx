"use client";

import { useEffect, useRef } from "react";
import { incrementPostView } from "@/lib/api";

export default function ViewCounter({ postId }: { postId: string }) {
  // 요청이 이미 전송되었는지 확인하는 ref
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    const handleViewCount = async () => {
      try {
        hasFetched.current = true;
        await incrementPostView(postId);
      } catch (error) {
        console.error("View count error:", error);
      }
    };

    handleViewCount();
  }, [postId]);

  return null;
}
