import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Component } from "react";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import QueryProvider from "@/components/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Hub",
  description: "Hub for developers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            storageKey="devhub-theme"
          >
            <Toaster theme="light" position="bottom-center" />
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
