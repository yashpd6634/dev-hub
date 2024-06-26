import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";

import React, { ReactNode } from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import Container from "./_components/container";

interface CreaterLayoutProps {
  params: { username: string };
  children: ReactNode;
}

const CreaterLayout = async ({ params, children }: CreaterLayoutProps) => {
  const self = await getSelfByUsername(decodeURIComponent(params.username));

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreaterLayout;
