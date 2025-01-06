import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    username?: string;
  }
  interface Session {
    backend_token?: string;
    user: {
      username?: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    backend_token?: string;
    username?: string;
  }
}
