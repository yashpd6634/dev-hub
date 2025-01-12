"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

type MediaRoomProps = {
  chatId: string;
  video: boolean;
  audio: boolean;
};

const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const user = useCurrentUser();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user?.username) return;

    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${user.username}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user?.username, chatId]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      audio={audio}
      video={video}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      token={token}
      connect={true}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};

export default MediaRoom;
