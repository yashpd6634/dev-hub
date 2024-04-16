import { db } from "@/lib/db";
import { Stream } from "@prisma/client";

interface updatedStreamValidDataProps {
    name: string | undefined;
    isChatEnabled: boolean | undefined;
    isChatDelayed: boolean | undefined;
    isChatFollowersOnly: boolean | undefined;
  }
  

export const getStreamByUserId = async (userId: string) => {
  const stream = await db.stream.findUnique({
    where: {
      userId,
    },
  });

  return stream;
};

export const updateStreamById = async (id: string, validData: updatedStreamValidDataProps) => {
  const updatedStream = await db.stream.update({
    where: {
      id,
    },
    data: {
      ...validData,
    },
  });

  return updatedStream;
};
