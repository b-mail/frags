import { Frag, Like, Post, User, Comment } from "@prisma/client";

export interface ApiResponse<T> {
  result: T;
  hasNextPage?: boolean;
  nextPage?: number | null;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}
