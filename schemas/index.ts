import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 charaters required",
  }),
  name: z.string().min(4, {
    message: "Should atleast contain 4 characters",
  }),
  username: z.string().min(4, {
    message: "Should atleast contain 4 characters",
  }),
});

export const UsernameSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Should contain at least 4 characters" })
    .regex(/^\S*$/, { message: "Username should not contain spaces" }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Minimum 8 charaters required",
  }),
});
