"use client";

import Hint from "@/components/hint";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

type ServerProps = {
  servers: Server[];
};

const Servers = ({ servers }: ServerProps) => {
  const { collapsed } = useSidebar((state) => state);

  if (!servers.length) {
    return null;
  }

  return (
    <ScrollArea flex-1 w-full>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Servers</p>
        </div>
      )}
      {servers.map((server) => (
        <div key={server.id} className="mb-4">
          <ServerItem
            id={server.id}
            imageUrl={server.imageUrl}
            name={server.name}
          />
        </div>
      ))}
    </ScrollArea>
  );
};

type ServerItemProps = {
  id: string;
  imageUrl: string;
  name: string;
};

export const ServerItem = ({ id, imageUrl, name }: ServerItemProps) => {
  const params = useParams();
  const router = useRouter();
  const { collapsed } = useSidebar((state) => state);

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <Hint side="right" align="center" label={name} asChild>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "bg-white absolute left-0 rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover: h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={imageUrl} alt="Channel" />
        </div>
        {!collapsed && <p className="truncate text-sm">{name}</p>}
      </button>
    </Hint>
  );
};

export default Servers;
