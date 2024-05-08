"use client";

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useAuth from "@/store/AuthStore";
import { login } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<{ message: string }>({
    message: "",
  });
  const user = useAuth.use.user();
  const setUser = useAuth.use.setUser();
  const setAccessToken = useAuth.use.setAccessToken();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);
      router.push("/");
    },
    onError: (error) => {
      setError({
        message: error.message,
      });
    },
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate(values);
  };

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  return (
    <form
      className="flex flex-col gap-8 rounded-2xl bg-slate-900 p-10 shadow-2xl"
      style={{ width: "32rem" }}
      onSubmit={handleSubmit}
    >
      <EmailInput value={values.email} onChange={handleChange} />
      <PasswordInput value={values.password} onChange={handleChange} />
      {error.message && <div className="text-red-400">{error.message}</div>}
      <button
        className="w-full rounded-2xl bg-green-400 py-4 text-lg font-bold hover:bg-green-500 disabled:bg-slate-500"
        type="submit"
        disabled={isPending}
      >
        로그인하기
      </button>
    </form>
  );
}
