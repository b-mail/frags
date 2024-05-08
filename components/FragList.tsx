import { Frag } from "@prisma/client";
import FragListItem from "@/components/FragListItem";

export default function FragList({ frags }: { frags: Frag[] }) {
  return (
    <li>
      {frags.map((frag) => (
        <FragListItem key={frag.id} frag={frag} />
      ))}
    </li>
  );
}
