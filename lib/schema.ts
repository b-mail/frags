import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(8, "비밀번호는 8글자 이상, 15글자 이하로 입력해주세요.")
    .max(15, "비밀번호는 8글자 이상, 15글자 이하로 입력해주세요.")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#@&*]).{8,15}$/,
      "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다",
    ),
});

export type LoginFields = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.merge(
  z.object({
    name: z
      .string()
      .min(1, "이름을 입력해주세요")
      .min(2, "이름은 2글자 이상, 8글자 이하로 입력해주세요.")
      .max(8, "이름은 2글자 이상, 8글자 이하로 입력해주세요.")
      .regex(
        /^[가-힣a-zA-Z\s]*$/,
        "이름은 한글, 영문, 공백만 입력할 수 있습니다",
      ),
    bio: z.string().max(20, "한 줄 소개는 20글자 이하로 입력해주세요."),
  }),
);

export type RegisterFields = z.infer<typeof registerSchema>;

export const fragSchema = z.object({
  name: z
    .string()
    .min(1, "FRAG 이름을 입력해주세요")
    .min(2, "FRAG 이름은 2글자 이상, 10글자 이하로 입력해주세요.")
    .max(10, "FRAG 이름은 2글자 이상, 10글자 이하로 입력해주세요."),
  description: z
    .string()
    .min(1, "FRAG 설명을 입력해주세요")
    .min(10, "FRAG 설명은 10글자 이상, 100글자 이하로 입력해주세요.")
    .max(100, "FRAG 설명은 10글자 이상, 100글자 이하로 입력해주세요."),
});

export type FragFields = z.infer<typeof fragSchema>;

export const postSchema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력해주세요")
    .max(20, "제목은 20글자 이하로 입력해주세요."),
  content: z
    .string()
    .min(1, "본문을 입력해주세요")
    .max(500, "본문은 500글자 이하로 입력해주세요."),
});

export type PostFields = z.infer<typeof postSchema>;

export const commentSchema = z.object({
  content: z
    .string()
    .min(1, "내용을 입력해주세요")
    .max(100, "내용은 100글자 이하로 입력해주세요."),
});

export type CommentFields = z.infer<typeof commentSchema>;
