import React from "react";
import Wrapper from "./wrapper";
import Toggle, { ToggleSkeleton } from "./toggle";
import { getRecommended } from "@/lib/recommended-service";
import Recommended, { RecommendedSkeleton } from "./recommended";
import { getFollowedUsers } from "@/lib/follow-service";
import Following, { FollowingSkeleton } from "./following";
import { getServers } from "@/lib/server-service";
import { Separator } from "@/components/ui/separator";
import { AddServer } from "./add-server";
import Servers from "./servers";

const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();
  const servers = await getServers();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
        <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-auto mx-4" />
        <AddServer />
        <Servers servers={servers} />
      </div>
    </Wrapper>
  );
};

export default Sidebar;

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
