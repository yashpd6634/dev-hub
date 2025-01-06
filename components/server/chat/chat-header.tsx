import MobileToggle from "@/components/mobile-toggle";
import UserAvatar from "@/components/user-avatar";
import { Hash } from "lucide-react";
import React from "react";
import ChatVideoButton from "./chat-video-button";
import SocketIndicator from "@/components/socket-indicator";

type ChatHeaderProps = {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
};

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="z-10 text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversation" && (
        <div className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-5">
          <UserAvatar imageUrl={imageUrl!} username={name} />
        </div>
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
        {type === "conversation" && <ChatVideoButton />}
      </div>
    </div>
  );
};

export default ChatHeader;
