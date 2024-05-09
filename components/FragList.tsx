import { Frag } from "@prisma/client";
import FragListItem from "@/components/FragListItem";

export default function FragList({ frags }: { frags: Frag[] }) {
  return (
    <li className="flex list-none flex-col gap-10">
      {frags.map((frag) => (
        <FragListItem key={frag.id} frag={frag} />
      ))}
    </li>
  );
}
