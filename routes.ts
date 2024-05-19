export const publicRoutes = [
  "/",
  "/api/webhooks(.*)",
  "/api/uploadthing",
  "/:username*",
  "/search",
  "/auth/new-verfication",
];

export const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/auth/error",
  "/auth/reset",
  "auth/new-password",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/";
