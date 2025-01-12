import { getSelf } from "./auth-service";
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

export const getChannelWithServer = async (channelId: string) => {
  try {
    const channel = await db.channel.findUnique({
      where: {
        id: channelId,
      },
      include: {
        server: true,
      },
    });

    return channel;
  } catch (error) {
    console.log(error, "Channel is not found");
  }
};

export const checkIfUserBelongsToGivenChannel = async (channelId: string) => {
  try {
    const self = await getSelf();

    const server = await db.server.findFirst({
      where: {
        members: {
          some: {
            userId: self.id,
          },
        },
      },
      include: {
        channels: {
          where: {
            id: channelId,
          },
        },
      },
    });

    if (!server || !server.channels) {
      throw new Error("User does not belong to this channel");
    }

    return true;
  } catch (error) {
    console.log(error, "Something wrong with channelId or server");
  }
};
