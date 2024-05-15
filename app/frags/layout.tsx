import { ReactNode } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function FragsLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
