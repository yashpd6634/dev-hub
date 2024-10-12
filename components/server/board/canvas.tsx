"use client";

import React, { useCallback, useEffect, useState } from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useSelf,
} from "@liveblocks/react/suspense";
import { getChannelWithServer } from "@/actions/channel";
import { Channel, Server } from "@prisma/client";
import { Camera, CanvasMode, CanvasState } from "@/type";
import CursorsPresence from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";

type CanvasProps = {
  boardId: string;
};

type ChannelWithServer = Channel & {
  server: Server;
};

const Canvas = ({ boardId }: CanvasProps) => {
  const { name, avatar } = useSelf((me) => me.info);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
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

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);
      setMyPresence({ cursor: current });
    },
    []
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  return (
    <div className="h-full w-full relative bg-neutral-300 touch-none text-black">
      <Info boardId={boardId} board={board} />
      <Participants board={board} />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        className="fixed top-0 left-0 h-screen w-screen overflow-hidden z-0"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </div>
  );
};

export default Canvas;
