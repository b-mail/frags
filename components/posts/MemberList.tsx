import { User } from "@prisma/client";

export default function MemberList({ members }: { members: User[] }) {
  return (
    <ul className="flex h-96 w-full list-none flex-col gap-2 overflow-scroll rounded-2xl bg-slate-800 p-4">
      {members.map((member) => (
        <li className="flex items-center gap-2 text-slate-400" key={member.id}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 stroke-slate-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          {member.name}
        </li>
      ))}
    </ul>
  );
}
