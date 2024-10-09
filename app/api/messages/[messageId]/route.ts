import { currentUser } from "@/actions/user";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/type";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { messageId: string } },
  res: NextApiResponseServerIo
) {
  try {
    const profile = await currentUser();
    const { searchParams } = new URL(req.url!);

    const serverId = searchParams.get("serverId");
    const channelId = searchParams.get("channelId");

    console.log(searchParams);

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("ServerId is missing", { status: 400 });
    }

    if (!channelId) {
      return new NextResponse("ChannelId is missing", { status: 400 });
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

    let message = await db.message.findFirst({
      where: {
        id: params.messageId as string,
        channelId: channelId as string,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!member || message?.deleted) {
      return new NextResponse("Message not found", { status: 404 });
    }

    const isMessageOwner = message?.memberId === member.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const canModify = isMessageOwner || isAdmin || isModerator;

    if (!canModify) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    message = await db.message.update({
      where: {
        id: params.messageId as string,
      },
      data: {
        fileUrl: null,
        content: "This message has been deleted",
        deleted: true,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    const updateKey = `chat:${channelId}:messages:update`;

    res?.socket?.server?.io?.emit(updateKey, message);

    return NextResponse.json(message);
  } catch (error) {
    console.log("[MESSAGES_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { messageId: string } },
  res: NextApiResponseServerIo
) {
  try {
    const profile = await currentUser();
    const { searchParams } = new URL(req.url!);

    const { content } = await req.json();
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

    let message = await db.message.findFirst({
      where: {
        id: params.messageId as string,
        channelId: channelId as string,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!member || message?.deleted) {
      return new NextResponse("Message not found", { status: 404 });
    }

    const isMessageOwner = message?.memberId === member.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const canModify = isMessageOwner || isAdmin || isModerator;

    if (!canModify) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!isMessageOwner)
      return new NextResponse("Unauthorized", { status: 401 });

    message = await db.message.update({
      where: {
        id: params.messageId as string,
      },
      data: {
        content,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    const updateKey = `chat:${channelId}:messages:update`;

    res?.socket?.server?.io?.emit(updateKey, message);

    return NextResponse.json(message);
  } catch (error) {
    console.log("[MESSAGES_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
