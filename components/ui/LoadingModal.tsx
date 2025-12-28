import LoadingIndicator from "@/components/ui/LoadingIndicator";

export default function LoadingModal({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <LoadingIndicator message={message} />
    </div>
  );
}
