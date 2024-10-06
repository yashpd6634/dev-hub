import { db } from "./db";

export const getChannel = async (channelId: string) => {
  try {
    const channel = await db.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    return channel;
  } catch (error) {
    console.log(error, "Channel is not found");
  }
};
