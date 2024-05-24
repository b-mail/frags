import axios from "@/lib/axios";

// Authentication

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

// Frag

export async function getFrags(
  token: string,
  params: {
    page: number;
    limit: number;
    order?: "latest" | "alphabet" | "member";
    search?: string;
    member?: string;
    admin?: string;
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

export async function getFragByFragId(fragId: string) {
  const res = await axios.get(`/frags/${fragId}`);

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

export async function joinFragByFragId(token: string, fragId: string) {
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

export async function updateFragByFragId(
  token: string,
  fragId: string,
  body: { name: string; description: string },
) {
  const res = await axios.put(`/frags/${fragId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function deleteFragByFragId(
  token: string,
  fragId: string,
  body: { name: string },
) {
  const res = await axios.post(`/frags/${fragId}/delete`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

// User

export async function getUserByUserId(userId: string) {
  const res = await axios.get(`/users/${userId}`);

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function getUsersByFragId(fragId: string) {
  const res = await axios.get(`/frags/${fragId}/members`);

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function updateUser(
  token: string,
  body: { name: string; email: string; bio: string },
) {
  const res = await axios.put("/users", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function deleteUserByUserId(
  token: string,
  userId: string,
  body: { email: string; password: string },
) {
  const res = await axios.post(`/users/${userId}/delete`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function excludeUserByFragIdAndUserId(
  token: string,
  fragId: string,
  userId: string,
) {
  const res = await axios.delete(`/frags/${fragId}/members/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

// Post

export async function getPostsByFragId(
  token: string,
  fragId: string,
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

export async function getPostsByFragIdAndUserId(
  token: string,
  fragId: string,
  userId: string,
) {
  const res = await axios.get(`/frags/${fragId}/members/${userId}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function getPostByPostId(token: string, postId: string) {
  const res = await axios.get(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function createPost(
  token: string,
  fragId: string,
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

export async function updatePostByPostId(
  token: string,
  postId: string,
  body: { title: string; content: string },
) {
  const res = await axios.put(`/posts/${postId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function deletePostByPostId(token: string, postId: string) {
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

// Comment

export async function getCommentsByPostId(postId: string) {
  const res = await axios.get(`/posts/${postId}/comments`);

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function getCommentsByFragIdAndUserId(
  token: string,
  fragId: string,
  userId: string,
) {
  const res = await axios.get(`/frags/${fragId}/members/${userId}/comments`, {
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
  postId: string,
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

export async function updateCommentByCommentId(
  token: string,
  commentId: string,
  body: { content: string },
) {
  const res = await axios.put(`/comments/${commentId}`, body, {
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
  commentId: string,
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

// Like

export async function getLikesByPostId(postId: string) {
  const res = await axios.get(`/posts/${postId}/likes`);

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function getLikesByFragIdAndUserId(
  token: string,
  fragId: string,
  userId: string,
) {
  const res = await axios.get(`/frags/${fragId}/members/${userId}/likes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    throw new Error(res.data.message);
  }

  return res.data;
}

export async function likePostByPostId(token: string, postId: string) {
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

export async function unlikePostByPostId(token: string, postId: string) {
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
