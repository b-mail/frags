import { ReactNode } from "react";
import LoadingIndicator from "@/components/ui/LoadingIndicator";

export default function LoadingContainer({
  isLoading,
  message,
  noShadow = false,
  children,
}: {
  isLoading: boolean;
  message: string;
  noShadow?: boolean;
  children: ReactNode;
}) {
  return isLoading ? (
    <LoadingIndicator message={message} noShadow={noShadow} />
  ) : (
    children
  );
}
