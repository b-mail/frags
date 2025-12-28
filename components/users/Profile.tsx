"use client";

import { User } from "@prisma/client";
import Link from "next/link";

export default function Profile({ user }: { user: User | null }) {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl md:p-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-400/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 stroke-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">{user?.name}</h1>
              <p className="text-sm text-slate-400">프로필</p>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-400">소개</h3>
            <div className="min-h-20 rounded-xl bg-slate-800 p-4 text-slate-300">
              {user?.bio && user.bio.length > 0 ? (
                user?.bio
              ) : (
                <span className="text-slate-500 italic">소개가 없습니다.</span>
              )}
            </div>
          </div>

          <hr className="border border-slate-700" />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                이메일
              </span>
              <p className="text-sm text-slate-300 md:text-base">
                {user?.email}
              </p>
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                가입일자
              </span>
              <p className="text-sm text-slate-300 md:text-base">
                {user?.createdAt.toString().slice(0, 10).split("-").join(". ")}
              </p>
            </div>
          </div>

          <hr className="border border-slate-700" />

          <div className="flex flex-col gap-3 md:flex-row">
            <Link
              href="/me/edit"
              className="flex items-center justify-center gap-2 rounded-xl bg-green-400 px-4 py-3 font-bold text-slate-900 transition-all hover:scale-105 hover:bg-green-500 md:flex-1"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              프로필 수정
            </Link>
            <Link
              href="/me/delete"
              className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-bold text-red-400 transition-all hover:scale-105 hover:bg-red-500/20 md:flex-1"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              회원탈퇴
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
