"use client";

import { getChannelWithServer } from "@/actions/channel";
import { DropdownActions } from "@/components/server/board/dropdown-actions";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useModal } from "@/store/use-modal-store";
import { Channel, Server } from "@prisma/client";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type InfoProps = {
  boardId: string;
  board: ChannelWithServer | null | undefined;
};

type ChannelWithServer = Channel & {
  server: Server;
};

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

const Info = ({ boardId, board }: InfoProps) => {
  const { onOpen } = useModal();

  if (!board) {
    return <Info.Skeleton />;
  }

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Button variant="board" className="px-2">
        <Image
          src={board.server.imageUrl}
          alt="Board Logo"
          height={40}
          width={40}
        />
        <span
          className={cn(
            "font-semibold text-xl ml-2 text-black",
            font.className
          )}
        >
          {board.server.name}
        </span>
      </Button>
      <TabSeparator />
      <Hint label="Edit Board Name" side="bottom">
        <Button
          onClick={() =>
            onOpen("editChannel", { channel: board, server: board.server })
          }
          variant="board"
          className="text-base font-normal px-2"
        >
          {board.name}
        </Button>
      </Hint>
      <TabSeparator />
      <DropdownActions side="bottom" sideOffset={0}>
        <div>
          <Hint label="Main menu" side="bottom">
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </DropdownActions>
    </div>
  );
};

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};

export default Info;
