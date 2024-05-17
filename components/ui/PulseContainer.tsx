import { ReactNode } from "react";

export default function PulseContainer({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) {
  return isLoading ? (
    <div className="h-8 w-3/4 animate-pulse rounded-xl bg-slate-800 text-slate-800" />
  ) : (
    children
  );
}
