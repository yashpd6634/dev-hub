import { currentUser } from "@/actions/user";
import ChatHeader from "@/components/server/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { getFirstMemberWithProfile } from "@/lib/member-service";
import { redirect } from "next/navigation";
import React from "react";

type MemberIdPageProps = {
  params: {
    memberId: string;
    serverId: string;
  };
};

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const profile = await currentUser();

  if (!profile) {
    return redirect("/sign-in");
  }

  const currentMember = await getFirstMemberWithProfile(params.serverId);

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne.userId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.user.image!}
        name={otherMember.user.name}
        serverId={params.serverId}
        type="conversation"
      />
    </div>
  );
};

export default MemberIdPage;
