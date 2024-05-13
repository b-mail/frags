"use client";

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import useAuth from "@/store/AuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/api";
import Link from "next/link";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function PostForm({
  fragId,
  initialValues = { title: "", content: "" },
}: {
  fragId: number;
  initialValues?: { title: string; content: string };
}) {
  const [values, setValues] = useState(initialValues);

  const accessToken = useAuth.use.accessToken();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => createPost(accessToken as string, fragId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["frag", fragId, "posts"],
      });
      router.push(`/frags/${fragId}/posts`);
    },
  });

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate();
  };

  useEffect(() => {
    if (!queryClient.isMutating({ mutationKey: ["refresh"] }) && !accessToken) {
      router.push("/login");
    }
  }, [accessToken, queryClient, router]);

  return (
    <form
      className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl"
      onSubmit={handleSubmit}
    >
      {isPending && (
        <div className="fixed left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-slate-900 bg-opacity-50 backdrop-blur-lg">
          <LoadingIndicator message="업로드 중입니다." />
        </div>
      )}
      <input
        className="rounded-2xl border-4 border-slate-900 bg-slate-900 p-4 placeholder:text-slate-400 hover:bg-slate-800 focus:border-slate-800 focus:bg-slate-900 focus:outline-0"
        style={{ width: "32rem" }}
        placeholder="제목을 입력해주세요."
        name={"title"}
        value={values.title}
        onChange={handleChange}
      />
      <hr className="border border-slate-700" />
      <textarea
        className="h-96 resize-none overflow-scroll rounded-2xl border-4 border-slate-900 bg-slate-900 p-4 placeholder:text-slate-400 hover:bg-slate-800 focus:border-slate-800 focus:bg-slate-900 focus:outline-0"
        placeholder="본문을 입력해주세요."
        name={"content"}
        value={values.content}
        onChange={handleChange}
      />
      <div className="flex w-full items-center justify-end gap-4">
        <Link
          className="flex h-10 w-14 items-center justify-center rounded-2xl bg-slate-800 text-center text-slate-400 hover:text-red-400"
          href={`/frags/${fragId}/posts`}
        >
          취소
        </Link>
        <button
          className="h-10 w-24 rounded-2xl bg-green-400 font-bold hover:bg-green-500 disabled:bg-slate-500"
          type={"submit"}
          disabled={isPending}
        >
          확인
        </button>
      </div>
    </form>
  );
}
