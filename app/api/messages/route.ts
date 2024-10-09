import { currentUser } from "@/actions/user";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/type";
import { Message } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {
    const profile = await currentUser();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!channelId) {
      return new NextResponse("Channel ID is missing", { status: 400 });
    }

    let messages: Message[] = [];

    if (cursor) {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id;
    }

    return NextResponse.json({
      items: messages,
      nextCursor,
    });
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request, res: NextApiResponseServerIo) {
  try {
    const profile = await currentUser();
    const { searchParams } = new URL(req.url!);

    const { content, fileUrl } = await req.json();
    const serverId = searchParams.get("serverId");
    const channelId = searchParams.get("channelId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("ServerId is missing", { status: 400 });
    }

    if (!channelId) {
      return new NextResponse("ChannelId is missing", { status: 400 });
    }

    if (!content) {
      return new NextResponse("Content is missing", { status: 400 });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            userId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      return new NextResponse("Channel not found", { status: 404 });
    }

    const member = server.members.find(
      (member) => member.userId === profile.id
    );

    if (!member) {
      return new NextResponse("Member not found", { status: 404 });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    const channelKey = `chat:${channelId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return NextResponse.json(message);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
