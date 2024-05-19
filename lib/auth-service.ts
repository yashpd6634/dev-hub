import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getSelf = async () => {
  const session = await auth();
  const self = session?.user;

  if (!self || !self.id) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      id: self.id,
    },
  });

  if (!user) {
    throw new Error("Not Found");
  }

  return user;
};

export const getSelfByUsername = async (username: string) => {
  const self = await getSelf();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (self.username !== user.username) {
    throw new Error("Unauthorized");
  }

  return user;
};
