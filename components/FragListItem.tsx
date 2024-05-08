import { Frag } from "@prisma/client";

export default function FragListItem({ frag }: { frag: Frag }) {
  return (
    <div key={frag.id}>
      <h2>{frag.name}</h2>
      <p>{frag.description}</p>
    </div>
  );
}
