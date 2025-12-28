import { User } from "@prisma/client";
import { useMemo } from "react";

export default function MemberList({
  members,
  adminId,
}: {
  members: User[];
  adminId?: string;
}) {
  const sortedMembers = useMemo(() => {
    if (!adminId) return members;
    const admin = members.find((m) => m.id === adminId);
    const others = members.filter((m) => m.id !== adminId);
    return admin ? [admin, ...others] : others;
  }, [members, adminId]);

  return (
    <ul className="scrollbar-hide flex h-96 w-full list-none flex-col gap-3 overflow-y-auto rounded-2xl bg-slate-800/50 p-4">
      <div className="mb-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
        멤버 ({members.length})
      </div>
      {sortedMembers.map((member) => {
        const isAdmin = !!adminId && member.id === adminId;
        return (
          <li
            className={`flex items-center justify-between rounded-xl px-3 py-2 transition-all duration-200 ${
              isAdmin
                ? "border border-green-400/20 bg-green-400/10 shadow-sm shadow-green-400/5"
                : "text-slate-400 hover:bg-white/5"
            }`}
            key={member.id}
          >
            <div className="flex min-w-0 items-center gap-2.5">
              {isAdmin ? (
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-green-400/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-3 text-green-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-700/50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="size-3 text-slate-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
              )}
              <span
                className={`truncate text-sm font-semibold ${isAdmin ? "text-green-400" : ""}`}
              >
                {member.name}
              </span>
            </div>
            {isAdmin && (
              <span className="shrink-0 rounded-md bg-green-400/20 px-1.5 py-0.5 text-[9px] font-black tracking-tighter text-green-400 uppercase">
                관리자
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
