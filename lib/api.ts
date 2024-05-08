import axios from "@/lib/axios";
import useAuth from "@/store/AuthStore";

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

export async function getFrags(
  token: string,
  {
    page = 0,
    limit = 6,
    order = "latest",
    search,
    member,
    admin,
  }: {
    page: number;
    limit: number;
    order?: "latest" | "alphabet" | "member";
    search?: string;
    member?: number;
    admin?: number;
  },
) {
  const res = await axios.get("/frags", {
    params: {
      page,
      limit,
      order,
      search,
      member,
      admin,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function uploadFrag(
  token: string,
  body: { name: string; description: string },
) {
  const res = await axios.post("/frags", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}
