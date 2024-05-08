import axios from "@/lib/axios";

export async function register(body: {
  name: string;
  email: string;
  password: string;
  bio?: string;
}) {
  const res = await axios.post("/users", body);

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function login(body: { email: string; password: string }) {
  const res = await axios.post("/auth/login", body);

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function logout() {
  const res = await axios.delete("/auth/logout");

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function refresh() {
  const res = await axios.get("/auth/refresh");

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}
