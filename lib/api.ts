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

export async function getFragByFragId(fragId: number | string) {
  const res = await axios.get(`/frags/${fragId}`, {});

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

export async function getUserByUserId(userId: number | string) {
  const res = await axios.get(`/users/${userId}`);

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function getUsersByFragId(fragId: number | string) {
  const res = await axios.get(`/frags/${fragId}/members`);

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function joinFragByFragId(token: string, fragId: number | string) {
  const res = await axios.post(
    `/frags/${fragId}/members`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status >= 400) {
    console.log(res.data.message);
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function getPostsByFragId(
  token: string,
  fragId: number | string,
  params: {
    page: number;
    limit: number;
    order?: "latest" | "like";
    search?: string;
  },
) {
  const res = await axios.get(`/frags/${fragId}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

export async function getPostByPostId(postId: number | string) {
  const res = await axios.get(`/posts/${postId}`);

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function getCommentsByPostId(postId: number | string) {
  const res = await axios.get(`/posts/${postId}/comments`);

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function getLikesByPostId(postId: number | string) {
  const res = await axios.get(`/posts/${postId}/likes`);

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function likePostByPostId(token: string, postId: number | string) {
  const res = await axios.post(
    `/posts/${postId}/likes`,
    {},
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

export async function cancelLikePostByPostId(
  token: string,
  postId: number | string,
) {
  const res = await axios.delete(`/posts/${postId}/likes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function createCommentByPostId(
  token: string,
  postId: number | string,
  body: { content: string },
) {
  const res = await axios.post(`/posts/${postId}/comments`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function deletePostByPostId(
  token: string,
  postId: number | string,
) {
  const res = await axios.delete(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function deleteCommentByCommentId(
  token: string,
  commentId: number | string,
) {
  const res = await axios.delete(`/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}
