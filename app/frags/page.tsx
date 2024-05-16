import FragSearchBar from "@/components/frags/FragSearchBar";
import FragList from "@/components/frags/FragList";
import Link from "next/link";

export default function FragPage() {
  return (
    <div className="flex flex-col items-center gap-12">
      <FragSearchBar />
      <FragList />
      <Link
        className="fixed bottom-10 left-10 rounded-2xl bg-slate-900 p-4 text-slate-500 shadow-2xl hover:text-green-400"
        href={"/frags/new"}
      >
        + 새 FRAG 만들기
      </Link>
    </div>
  );
}
