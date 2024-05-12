"use client";

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import EmailInput from "@/components/login-register/EmailInput";
import PasswordInput from "@/components/login-register/PasswordInput";
import NameInput from "@/components/login-register/NameInput";
import BioInput from "@/components/login-register/BioInput";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import useAuth from "@/store/AuthStore";
import { register } from "@/lib/api";

export default function RegisterForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });
  const [error, setError] = useState<{ message: string }>({
    message: "",
  });
  const router = useRouter();
  const user = useAuth.use.user();

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      router.push("/login");
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
    mutate(values, {});
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <form
      className="flex flex-col gap-8 rounded-2xl bg-slate-900 p-10 shadow-2xl"
      style={{ width: "32rem" }}
      onSubmit={handleSubmit}
    >
      <NameInput value={values.name} onChange={handleChange} />
      <EmailInput value={values.email} onChange={handleChange} />
      <PasswordInput value={values.password} onChange={handleChange} />
      <BioInput value={values.bio} onChange={handleChange} />
      {error.message && <div className="text-red-400">{error.message}</div>}
      <button
        className="w-full rounded-2xl bg-green-400 py-4 text-lg font-bold hover:bg-green-500 disabled:bg-slate-500"
        type="submit"
        disabled={isPending}
      >
        회원가입하기
      </button>
    </form>
  );
}
