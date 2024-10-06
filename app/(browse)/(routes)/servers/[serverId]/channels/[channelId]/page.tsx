import { currentUser } from "@/actions/user";
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

  

  return <div>ChannelIdPage</div>;
};

export default ChannelIdPage;
