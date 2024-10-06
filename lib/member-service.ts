import { getSelf } from "./auth-service";
import { db } from "./db";

export const getFirstMember = async (serverId: string) => {
  try {
    const self = await getSelf();

    const member = await db.member.findFirst({
      where: {
        serverId: serverId,
        userId: self.id,
      },
    });

    return member;
  } catch (error) {
    console.log(error, "Something wrong with this server or member list");
  }
};
