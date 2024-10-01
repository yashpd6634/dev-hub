import { profile } from "console";
import { getSelf } from "./auth-service";
import { db } from "./db";

export const getServers = async () => {
  try {
    const self = await getSelf();

    const servers = await db.server.findMany({
      where: {
        members: {
          some: {
            userId: self.id,
          },
        },
      },
    });

    return servers;
  } catch (error) {
    return [];
  }
};

export const getServer = async (serverId: string) => {
  try {
    const self = await getSelf();

    const server = await db.server.findUnique({
      where: {
        id: serverId,
        members: {
          some: {
            userId: self.id,
          },
        },
      },
    });

    return server;
  } catch (error) {
    console.log(error, "server error");
  }
};

export const getServerSidebarDetails = async (serverId: string) => {
  try {
    const server = await db.server.findUnique({
      where: {
        id: serverId,
      },
      include: {
        channels: {
          orderBy: {
            createdAt: "asc",
          },
        },
        members: {
          include: {
            user: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return server;
  } catch (error) {
    console.log(error, "server error");
  }
};
