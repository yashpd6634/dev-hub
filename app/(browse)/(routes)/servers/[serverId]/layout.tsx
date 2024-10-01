import { currentUser } from "@/actions/user";
import { getServer } from "@/lib/server-service";
import { redirect } from "next/navigation";
import ServerSidebar from "@/components/server/sidebar/server-sidebar";
import React from "react";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
}) => {
  const profile = await currentUser();

  if (!profile) {
    return redirect("/sign-in");
  }

  const server = await getServer(params.serverId);

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
