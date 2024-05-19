"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail, getUserByUsername } from "@/lib/user-service";
import { generateVerificationToken } from "./token";
import { sendVerficationEmail } from "@/lib/mail-service";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid field!" };
  }

  const { email, password, name, username } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already taken!" };
  }

  const existingUsername = await getUserByUsername(username);

  if (existingUsername) {
    return { error: "Username already exist!" };
  }

  await db.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerficationEmail(verificationToken.email, verificationToken.token);

  return {
    success: "Confirmation email sent!",
  };
};
