import React from "react";

interface HierarchyConnectorProps {
  type: "frags-to-frag" | "frag-to-posts";
  className?: string;
}

export default function HierarchyConnector({
  type,
  className = "",
}: HierarchyConnectorProps) {
  // Common down arrow SVG
  const DownArrow = () => (
    <div className="flex flex-col items-center justify-center gap-[-4px] text-slate-600">
      <svg
        className="h-6 w-6 animate-pulse text-green-400/50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );

  return (
    <div
      className={`relative flex w-full items-center justify-center ${className}`}
      style={{
        height: "60px",
      }}
    >
      <div className="flex flex-col items-center">
        {/* Decorative gradient flow (very subtle, soft glow instead of line) */}
        <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-linear-to-b from-transparent via-green-400/20 to-transparent" />

        {/* The Arrow */}
        <div className="z-10 rounded-full border border-white/5 bg-slate-900 p-2 shadow-lg shadow-green-400/5">
          <DownArrow />
        </div>
      </div>
    </div>
  );
}
