import { Frag } from "@prisma/client";
import FragListItem from "@/components/FragListItem";

export default function FragList({ frags }: { frags: Frag[] }) {
  return (
    <li className="flex list-none flex-col gap-10">
      {frags.length !== 0 ? (
        frags.map((frag) => <FragListItem key={frag.id} frag={frag} />)
      ) : (
        <div className="rounded-2xl bg-slate-900 p-6 shadow-2xl">
          검색 조건에 맞는 FRAG을 찾을 수 없습니다.
        </div>
      )}
    </li>
  );
}
