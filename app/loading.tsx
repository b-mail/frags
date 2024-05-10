import LoadingIndicator from "@/components/LoadingIndicator";

export default function LoadingPage() {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
      <LoadingIndicator message="페이지 불러오는 중" />
    </div>
  );
}
