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
