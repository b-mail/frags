"use client";

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFrag } from "@/lib/api";
import useAuth from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import LoadingModal from "@/components/LoadingModal";

export default function NewFragPage() {
  const accessToken = useAuth.use.accessToken();

  const queryClient = useQueryClient();
  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    description: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await createFrag(accessToken as string, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["frags"],
      });

      router.push("/frags");
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
      className="flex flex-col gap-10 rounded-2xl bg-slate-900 p-10 shadow-2xl"
      onSubmit={handleSubmit}
    >
      {isPending && <LoadingModal message={"FRAG 생성 중"} />}
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">새 FRAG 만들기</h2>
        <hr className="border border-slate-700" />
      </div>
      <div className="flex flex-col gap-4">
        <label className="text-xl font-bold" htmlFor="name">
          FRAG 이름
        </label>
        <input
          className="rounded-2xl border-4 border-slate-700 bg-slate-800 p-4 placeholder:text-slate-500 focus:border-slate-500 focus:outline-0"
          id="name"
          name="name"
          type="text"
          placeholder="FRAG 이름을 입력해주세요!"
          value={values.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label className="text-xl font-bold" htmlFor="description">
          FRAG 소개
        </label>
        <textarea
          className="w-96 resize-none rounded-2xl border-4 border-slate-700 bg-slate-800 p-4 placeholder:text-slate-500 focus:border-slate-500 focus:outline-0"
          id="description"
          name="description"
          placeholder="FRAG을 소개해보세요! "
          value={values.description}
          onChange={handleChange}
        />
      </div>
      <button
        className="rounded-2xl bg-green-400 py-2 text-lg font-bold hover:bg-green-500"
        type="submit"
        disabled={isPending}
      >
        완료
      </button>
    </form>
  );
}
