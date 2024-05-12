import { User } from "@prisma/client";

export default function MemberList({ members }: { members: User[] }) {
  return (
    <ul className="flex h-96 w-full list-none flex-col gap-2 overflow-scroll rounded-2xl bg-slate-800 p-4">
      {members.map((member) => (
        <>
          <li className="text-slate-400" key={member.id}>
            {member.name}
          </li>
        </>
      ))}
    </ul>
  );
}
