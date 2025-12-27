import FragSearchBar from "@/components/frags/FragSearchBar";
import FragList from "@/components/frags/FragList";
import Link from "next/link";

export let metadata = {
  title: "FRAGS | FRAGS",
  description: "FRAGS 목록 페이지입니다.",
};

export default function FragPage() {
  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-12">
      <FragSearchBar />
      <FragList />
      <Link
        className="fixed bottom-10 left-10 rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-slate-400 shadow-2xl backdrop-blur-xl hover:text-green-400"
        href={"/frags/new"}
      >
        + 새 FRAG 만들기
      </Link>
    </div>
  );
}
