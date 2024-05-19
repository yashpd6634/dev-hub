import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./lib/user-service";
import { redirect } from "next/navigation";

const createRandomUsername = async () => {
  let username = `User#${Math.floor(Math.random() * 10000)}`;
  let user = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  while (user) {
    username = `user#${Math.floor(Math.random() * 10000)}`;
    user = await db.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  return username;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/sign-in",
    error: "/authError",
    newUser: "/auth/username",
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
          stream: {
            create: {
              name: `${user.username}'s stream`,
            },
          },
        },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        user.username = await createRandomUsername();
        return true;
      }

      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      return true;
    },

    async session({ token, session }) {
      if (token) {
        session.user.username = token.username as string;
      }
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) token.username = user.username;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
