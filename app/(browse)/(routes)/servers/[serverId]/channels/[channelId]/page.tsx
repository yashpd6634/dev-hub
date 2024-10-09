import { currentUser } from "@/actions/user";
import ChatHeader from "@/components/server/chat/chat-header";
import ChatInput from "@/components/server/chat/chat-input";
import ChatMessages from "@/components/server/chat/chat-messages";
import { getChannel } from "@/lib/channel-service";
import { getFirstMember } from "@/lib/member-service";
import { redirect } from "next/navigation";
import React from "react";

type ChannelIdPageProps = {
  params: {
    channelId: string;
    serverId: string;
  };
};

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentUser();

  if (!profile) {
    return redirect("/sign-in");
  }

  const channel = await getChannel(params.channelId);
  const member = await getFirstMember(params.serverId);

  if (!channel || !member) {
    return redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      <ChatMessages
        member={member}
        name={channel.name}
        chatId={channel.id}
        type="channel"
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        paramKey="channelId"
        paramValue={channel.id}
      />
      <ChatInput
        name={channel.name}
        apiUrl="/api/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        type="channel"
      />
    </div>
  );
};

export default ChannelIdPage;
