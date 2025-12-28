import Link from "next/link";
import Logo3D from "@/components/ui/Logo3D";
import HierarchyConnector from "@/components/home/HierarchyConnector";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-16 px-4 md:gap-20 md:px-8 lg:px-0">
      {/* Hero Section */}
      <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-8 md:gap-12">
        {/* Logo & Title */}
        <div className="flex w-full flex-col items-center gap-6 md:gap-8">
          <div className="w-full max-w-[240px] md:max-w-[280px] lg:max-w-[320px]">
            <Logo3D />
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              당신의 커뮤니티를 <span className="text-green-400">찾으세요</span>
            </h1>
            <p className="max-w-xl text-sm text-slate-300 md:text-base lg:text-lg">
              관심사, 취미, 공부 주제로 연결된 사람들과
              <br className="hidden md:block" />
              의미 있는 커뮤니티를 만들고 성장시키세요
            </p>
          </div>
        </div>

        {/* Primary CTA */}
        <Link
          className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-400 to-green-500 px-8 py-4 text-lg font-bold text-slate-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-400/50 md:px-10 md:py-5 md:text-xl"
          href="/frags"
        >
          FRAGS 살펴보기
          <svg
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>

      {/* Description Section */}
      <div className="w-full max-w-6xl">
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-8">
          {/* FRAGS Description */}
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-linear-to-br from-slate-800 to-slate-900 p-8 md:p-10">
            <h3 className="text-lg font-bold text-green-400">FRAGS란?</h3>
            <p className="text-sm leading-relaxed text-slate-300">
              다양한 관심사를 가진 사람들이 모이는 커뮤니티 플랫폼입니다. 여러
              개의 FRAG으로 구성되어 당신이 원하는 커뮤니티를 찾고 만들 수
              있습니다.
            </p>
          </div>

          {/* FRAG Description */}
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-linear-to-br from-slate-800 to-slate-900 p-8 md:p-10">
            <h3 className="text-lg font-bold text-green-400">FRAG이란?</h3>
            <p className="text-sm leading-relaxed text-slate-300">
              취미, 관심사, 공부 주제를 공유하는 사람들이 모이는 개별
              커뮤니티입니다. 지금 바로 당신이 원하는 FRAG을 만들고 친구들을
              초대하세요.
            </p>
          </div>
        </div>
      </div>

      {/* Structure Visualization */}
      <div className="w-full max-w-6xl rounded-2xl border border-white/10 bg-linear-to-br from-slate-800 to-slate-900 p-8 md:p-12">
        <div className="flex w-full flex-col">
          {/* FRAGS Node */}
          <div className="relative z-10 mx-auto w-full max-w-[600px] rounded-2xl border border-white/20 bg-linear-to-br from-slate-700 to-slate-800 p-8 shadow-lg md:p-10">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-400/20 text-xl font-bold text-green-400 md:h-14 md:w-14">
                🌍
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-400 md:text-2xl">
                  FRAGS
                </h2>
              </div>
            </div>
          </div>

          <HierarchyConnector type="frags-to-frag" />

          {/* FRAGs Grid */}
          <div className="grid w-full gap-4 md:grid-cols-2">
            {/* FRAG 1 */}
            <div className="flex flex-col items-center">
              <div className="relative z-10 w-full rounded-2xl border border-white/20 bg-linear-to-br from-slate-700 to-slate-800 p-8 transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/10">
                <div className="flex items-start gap-3">
                  <div className="text-lg">📚</div>
                  <div>
                    <h3 className="font-bold text-green-400 md:text-lg">
                      FRAG
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* FRAG 2 */}
            <div className="flex flex-col items-center">
              <div className="relative z-10 w-full rounded-2xl border border-white/20 bg-linear-to-br from-slate-700 to-slate-800 p-8 transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/10">
                <div className="flex items-start gap-3">
                  <div className="text-lg">🎮</div>
                  <div>
                    <h3 className="font-bold text-green-400 md:text-lg">
                      FRAG
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <HierarchyConnector type="frag-to-posts" />

          {/* Posts Grid */}
          <div className="grid w-full gap-4 md:grid-cols-4">
            {/* Post 1 (FRAG 1) */}
            <div className="flex flex-col items-center">
              <div className="relative z-10 w-full rounded-xl border border-white/30 bg-linear-to-br from-slate-600 to-slate-700 p-6 transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/10">
                <div className="flex items-start gap-3">
                  <div className="text-base">📝</div>
                  <div>
                    <h4 className="font-semibold text-green-400 md:text-base">
                      Post
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Post 2 (FRAG 1) */}
            <div className="flex flex-col items-center">
              <div className="relative z-10 w-full rounded-xl border border-white/30 bg-linear-to-br from-slate-600 to-slate-700 p-6 transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/10">
                <div className="flex items-start gap-3">
                  <div className="text-base">💬</div>
                  <div>
                    <h4 className="font-semibold text-green-400 md:text-base">
                      Post
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Post 3 (FRAG 2) */}
            <div className="flex flex-col items-center">
              <div className="relative z-10 w-full rounded-xl border border-white/30 bg-linear-to-br from-slate-600 to-slate-700 p-6 transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/10">
                <div className="flex items-start gap-3">
                  <div className="text-base">🖼️</div>
                  <div>
                    <h4 className="font-semibold text-green-400 md:text-base">
                      Post
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Post 4 (FRAG 2) */}
            <div className="flex flex-col items-center">
              <div className="relative z-10 w-full rounded-xl border border-white/30 bg-linear-to-br from-slate-600 to-slate-700 p-6 transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/10">
                <div className="flex items-start gap-3">
                  <div className="text-base">📊</div>
                  <div>
                    <h4 className="font-semibold text-green-400 md:text-base">
                      Post
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-6xl rounded-2xl border border-green-400/20 bg-gradient-to-r from-green-400/10 via-slate-900 to-slate-900 p-8 text-center md:p-12">
        <h3 className="mb-3 text-2xl font-bold md:text-3xl">
          준비가 되셨나요?
        </h3>
        <p className="mb-6 text-slate-300 md:mb-8">
          지금 당신의 첫 번째 FRAG을 만들어보세요
        </p>
        <Link
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-400 px-6 py-3 text-base font-bold text-slate-900 transition-all hover:scale-105 hover:bg-green-500 md:px-8 md:py-4 md:text-lg"
          href="/frags"
        >
          FRAGS 시작하기
        </Link>
      </div>
    </div>
  );
}
