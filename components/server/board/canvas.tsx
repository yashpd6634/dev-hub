"use client";

import React, { useEffect, useState } from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useSelf } from "@liveblocks/react/suspense";
import { getChannelWithServer } from "@/actions/channel";
import { Channel, Server } from "@prisma/client";

type CanvasProps = {
  boardId: string;
};

type ChannelWithServer = Channel & {
  server: Server;
};

const Canvas = ({ boardId }: CanvasProps) => {
  const { name, avatar } = useSelf((me) => me.info);
  const [board, setBoard] = useState<ChannelWithServer | null | undefined>(
    null
  );

  useEffect(() => {
    const fetchBoard = async () => {
      const fetchedBoard = await getChannelWithServer(boardId);
      setBoard(fetchedBoard);
    };

    fetchBoard();
  }, [boardId]);

  return (
    <div className="h-full w-full relative bg-neutral-200 touch-none text-black">
      <Info boardId={boardId} board={board} />
      <Participants board={board} />
      <Toolbar />
    </div>
  );
};

export default Canvas;
