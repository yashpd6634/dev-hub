"use server";

import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId, updateStreamById } from "@/lib/stream-service";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await getStreamByUserId(self.id);

    if (!selfStream) {
      throw new Error("Stream not found");
    }

    const validData = {
      name: values.name,
      thumbnailUrl: values.thumbnailUrl,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly,
    };

    const updatedStream = await updateStreamById(selfStream.id, validData);

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return updatedStream;
  } catch {
    throw new Error("Internal Error");
  }
};
