"use server";

import { auth } from "@/auth";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUser = async (values: Partial<User>) => {
  try {
    const self = await getSelf();

    const validData = {
      bio: values.bio,
    };

    const user = await db.user.update({
      where: {
        id: self.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/${self.username}`);
    revalidatePath(`/u/${self.username}`);

    return user;
  } catch {
    throw new Error("Internal Error");
  }
};

export const createUsername = async (username: string) => {
  try {
    const self = await getSelf();
    const existingUser = await db.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return { error: "Username already exists" };
    }

    const user = await db.user.update({
      where: {
        id: self.id,
      },
      data: {
        username: username,
      },
    });

    return { success: "Username is updated" };
  } catch {
    return { error: "Internal Error" };
  }
};

export const currentUser = async () => {
  const self = await getSelf().catch(() => {
    return undefined;
  });

  return self;
};
