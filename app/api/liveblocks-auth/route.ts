import { currentUser } from "@/actions/user";
import { checkIfUserBelongsToGivenChannel } from "@/lib/channel-service";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_API_SECRET!,
});

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  const roomAvailable = await checkIfUserBelongsToGivenChannel(room);

  if (!roomAvailable) {
    return new Response("Unauthorized", { status: 403 });
  }

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.name,
      avatar: user.image!,
    },
  });

  if (roomAvailable) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
