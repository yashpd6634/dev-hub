"use server";

import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId, updateStreamById } from "@/lib/stream-service";
import {
  CreateIngressOptions,
  IngressAudioEncodingPreset,
  IngressAudioOptions,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  IngressVideoOptions,
  RoomServiceClient,
  TrackSource,
} from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

const ingressClient = new IngressClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  console.log(ingresses, "start ingresses");

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }

  console.log(ingresses, "end engresses");
};

export const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();
  console.log(self, "self");
  const selfStream = await getStreamByUserId(self.id);

  console.log(selfStream, "selfStream");

  if (!selfStream) {
    throw new Error("Stream not found");
  }

  await resetIngresses(self.id);

  console.log("reset Ingresses done!");

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = new IngressVideoOptions({
      source: TrackSource.CAMERA,
      encodingOptions: {
        case: "preset",
        value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      },
    });
    options.audio = new IngressAudioOptions({
      source: TrackSource.MICROPHONE,
      encodingOptions: {
        case: "preset",
        value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
      },
    });
  }

  console.log(options, "options");
  console.log(ingressType, "ingressType");
  console.log(ingressClient, "ingressClient");

  const ingress = await ingressClient.createIngress(ingressType, options);
  console.log(ingress, "ingress");

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create ingress");
  }

  const validData = {
    ingressId: ingress.ingressId,
    serverUrl: ingress.url,
    streamKey: ingress.streamKey,
  };

  await updateStreamById(selfStream.id, validData);

  revalidatePath(`/u/${self.username}/keys`);

  return ingress;
};
