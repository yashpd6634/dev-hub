"use server";

import { getChannelWithServer as getChannel } from "@/lib/channel-service";
import { revalidatePath } from "next/cache";

export const getChannelWithServer = async (channelId: string) => {
  try {
    const channel = await getChannel(channelId);

    return channel;
  } catch (error) {
    throw new Error("Internal error");
  }
};
