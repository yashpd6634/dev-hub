import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./lib/user-service";
import jwt from "jsonwebtoken";

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
  secret: process.env.AUTH_SECRET,
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
      if (token.email && session.user) {
        session.user.email = token.email;
      }

      if (token.backend_token) {
        session.backend_token = token.backend_token as string;
      }

      return session;
    },

    async jwt({ token, user }) {
      // If a user logs in (user object is present), add additional data
      if (user) {
        token.username = user.name;
        token.email = user.email;
        token.sub = user.id;

        // Create the backend token after the user logs in
        const nestBackendTokenPayload = {
          name: user.name,
          email: user.email,
          username: user.username,
        };

        const nestBackendTokenSecret =
          process.env.NEXT_PUBLIC_BACKEND_JWT_SECRET;

        if (!nestBackendTokenSecret) {
          throw new Error("Missing BACKEND_JWT_SECRET environment variable");
        }

        // Create the backend token and add it to the token object
        token.backend_token = jwt.sign(
          nestBackendTokenPayload,
          nestBackendTokenSecret,
          {
            expiresIn: "1d", // Set token expiration as needed
            subject: user.id, // Set the subject as the user ID
          }
        );

        console.log("next auth token", token);
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 4 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 4 * 24 * 60 * 60,
  },
  ...authConfig,
});
