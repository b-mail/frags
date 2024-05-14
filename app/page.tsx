import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-10">
      <Image src={"/logo_filled.png"} alt={"로고"} width={200} height={200} />
      <div>
        <div className="text-center text-6xl font-bold">FRAGS</div>
        <div className="text-lg text-slate-500">Fragments of the World</div>
      </div>
      <Link
        className="rounded-2xl bg-green-400 p-4 text-xl font-bold shadow-2xl hover:bg-green-500"
        href="/frags"
      >
        FRAGS 살펴보기
      </Link>
    </div>
  );
}
