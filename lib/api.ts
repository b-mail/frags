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
  const res = await axios.post("/auth/login", body, {
    withCredentials: true,
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function logout() {
  const res = await axios.delete("/auth/logout", {
    withCredentials: true,
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function refresh() {
  const res = await axios.get("/auth/refresh", {
    withCredentials: true,
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function getFrags(
  token: string,
  params: {
    page: number;
    limit: number;
    order?: "latest" | "alphabet" | "member";
    search?: string;
    member?: number;
    admin?: number;
  },
) {
  const res = await axios.get("/frags", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function createFrag(
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

export async function getUserById(id: number | string) {
  const res = await axios.get(`/users/${id}`);

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function getUsersByFragId(id: number | string) {
  const res = await axios.get(`/frags/${id}/members`);

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function addUserToFrag(
  token: string,
  {
    fragId,
    userId,
  }: {
    fragId: number | string;
    userId: number | string;
  },
) {
  const res = await axios.post(
    `/frags/${fragId}/members`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function getPostsByFragId(
  fragId: number | string,
  params: {
    page: number;
    limit: number;
    order?: "latest" | "alphabet" | "like";
    search?: string;
  },
) {
  const res = await axios.get(`/frags/${fragId}/posts`, {
    params,
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function createPost(
  token: string,
  fragId: number | string,
  body: { title: string; content: string },
) {
  const res = await axios.post(`/frags/${fragId}/posts`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}
