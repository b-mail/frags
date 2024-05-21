"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFragByFragId } from "@/lib/api";
import useAuth from "@/store/AuthStore";
import LoadingModal from "@/components/ui/LoadingModal";
import LoadingContainer from "@/components/ui/LoadingContainer";

export default function FragDeleteForm({ fragId }: { fragId: number }) {
  const [name, setName] = useState("");
  const [error, setError] = useState({ message: "" });

  const accessToken = useAuth.use.accessToken();

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      await deleteFragByFragId(accessToken!, fragId, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["frags"] });
      router.push("/frags");
    },
    onError: (error) => {
      setError({ message: error.message });
    },
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <form
      className="w-192 flex flex-col gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl"
      onSubmit={handleSubmit}
    >
      {isPending && <LoadingModal message={"FRAG 삭제 중"} />}
      <h2 className="text-xl font-bold text-red-400">FRAG 삭제하기</h2>
      <div className="text-slate-500">
        FRAG 삭제를 원하시면 FRAG 이름을 적어주세요
      </div>
      <input
        className={`${error?.message ? "border-red-400 focus:border-red-400" : "border-slate-700 focus:border-slate-500"} w-full rounded-2xl border-4  bg-slate-800 p-4  focus:outline-0`}
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <div className="flex w-full items-center justify-end gap-4">
        {error?.message && <ErrorMessage message={error.message} />}
        <button
          className="h-12 w-24 rounded-2xl bg-red-400 font-bold text-slate-900 hover:bg-red-500"
          type="submit"
        >
          삭제하기
        </button>
      </div>
    </form>
  );
}
