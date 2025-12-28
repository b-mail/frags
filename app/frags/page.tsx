import FragSearchBar from "@/components/frags/FragSearchBar";
import FragList from "@/components/frags/FragList";
import Link from "next/link";

export let metadata = {
  title: "FRAGS | FRAGS",
  description: "FRAGS 목록 페이지입니다.",
};

export default function FragPage() {
  return (
    <div className="flex w-full max-w-6xl flex-col gap-10 px-4 md:gap-16 md:px-8 lg:px-0">
      {/* Page Header */}
      <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 p-6 md:overflow-visible md:border-none md:bg-transparent md:p-0">
        {/* Ambient Glow Decoration - Clipped to prevent horizontal scroll */}
        <div className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-green-400/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-10 -bottom-24 h-48 w-48 rounded-full bg-green-400/10 blur-[80px]" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              FRAGS <span className="text-green-400">탐험</span>
            </h1>
            <p className="max-w-lg text-sm leading-relaxed text-slate-400 md:text-base lg:text-lg">
              당신의 열정을 공유할 새로운 커뮤니티를 발견하거나,
              <br className="hidden md:block" />
              직접 자신만의 특별한 공간을 만들어보세요.
            </p>
          </div>
          <Link
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-linear-to-r from-green-400 to-green-500 px-6 py-3.5 text-base font-bold text-slate-900 shadow-2xl shadow-green-400/20 transition-all duration-300 hover:scale-105 active:scale-95 md:px-10 md:py-5 md:text-lg"
            href={"/frags/new"}
          >
            <svg
              className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180 md:h-6 md:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            새 FRAG 만들기
          </Link>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="flex flex-col gap-12 md:gap-16">
        <div className="z-20">
          <FragSearchBar />
        </div>
        <FragList />
      </div>
    </div>
  );
}
