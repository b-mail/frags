import FragForm from "@/components/frags/FragForm";
import Image from "next/image";

export let metadata = {
  title: "새 FRAG 만들기 | FRAGS",
  description: "FRAGS 생성 페이지입니다.",
};

export default function NewFragPage() {
  return (
    <div className="flex items-start justify-center gap-10">
      <section className="flex w-96 flex-col justify-between gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl">
        <div className="flex flex-col gap-4">
          <h2 className="flex items-end gap-2 text-4xl font-bold">
            <div className="relative size-9">
              <Image src={"/logo_filled.png"} alt={"로고"} fill />
            </div>
            FRAG 만들기
          </h2>
          <hr className="border border-slate-800" />
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
            FRAG이 무엇인가요?
          </h3>
          <div className="flex flex-col gap-4 rounded-2xl bg-slate-800 p-4 text-sm">
            <p className="text-slate-400">
              FRAG은 하나의 커뮤니티입니다. FRAG은 저마다의 성격과 주제가
              정해져있습니다.
            </p>
            <p className="text-slate-400">
              FRAG을 만들면, 그 안에서 자유롭게 글을 작성하고 공유할 수
              있습니다.
            </p>
            <p className="text-slate-400">
              지금 바로 자신만의 FRAG을 만들어 원하는 이야기를 해보세요!
            </p>
          </div>
        </div>
      </section>
      <FragForm />
    </div>
  );
}
