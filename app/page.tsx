import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-16">
      <div className=" flex items-center justify-center gap-10">
        <Image src={"/logo_filled.png"} alt={"로고"} width={250} height={250} />
      </div>
      <div className="flex flex-col gap-10" style={{ width: "48rem" }}>
        <div className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl">
          <h2 className="text-2xl font-bold text-green-400">FRAGS?</h2>
          <p>
            FRAGS(프랙스)는 커뮤니티 플랫폼입니다. FRAGS는 여러 개의 FRAG으로
            이루어져 있습니다.
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl">
          <h2 className="text-2xl font-bold text-green-400">FRAG?</h2>
          <p>
            FRAG(프랙)은 FRAGS를 구성하는 요소입니다. FRAG은 취미나 관심사가
            같은 사람들, 함께 공부하는 사람들, 친한 친구들끼리 모이는 공간이 될
            수 있습니다.
          </p>
          <p>
            지금 바로 여러분이 원하는 FRAG을 만들어 여러분의 친구들을
            초대해보세요!
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-10">
        <Link
          className="rounded-2xl bg-green-400 p-4 text-xl font-bold shadow-2xl hover:bg-green-500"
          href="/frags"
        >
          FRAGS 살펴보기
        </Link>
      </div>
    </div>
  );
}
