import LoadingIndicator from "@/components/LoadingIndicator";

export default function LoadingModal({ message }: { message: string }) {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-900 bg-opacity-30 backdrop-blur">
      <LoadingIndicator message={message} />
    </div>
  );
}
