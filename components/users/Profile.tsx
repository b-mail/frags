"use client";

import { User } from "@prisma/client";

export default function Profile({ user }: { user: User | null }) {
  return (
    <div className="w-full rounded-2xl bg-slate-900 p-10 shadow-2xl">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 stroke-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <div className="text-2xl font-bold">{user?.name}</div>
        </div>
        <div className="rounded-2xl bg-slate-800 p-4 text-slate-400">
          {user?.bio && user.bio.length > 0 ? user?.bio : "소개가 없습니다."}
        </div>
        <hr className="w-full border border-slate-800" />
        <div className="text-sm text-slate-500">
          <span className="mr-4 inline-block w-24 rounded-2xl bg-slate-800 p-2 text-center text-slate-400">
            이메일
          </span>
          {user?.email}
        </div>
        <div className="text-sm text-slate-500">
          <span className="mr-4 inline-block w-24 rounded-2xl bg-slate-800 p-2 text-center text-slate-400">
            가입일자
          </span>
          {user?.createdAt.toString().slice(0, 10).split("-").join(". ")}
        </div>
      </div>
    </div>
  );
}
