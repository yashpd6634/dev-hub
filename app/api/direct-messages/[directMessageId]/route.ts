import { currentUser } from "@/actions/user";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/type";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { directMessageId: string } },
  res: NextApiResponseServerIo
) {
  try {
    const profile = await currentUser();
    const { searchParams } = new URL(req.url!);

    const conversationId = searchParams.get("conversationId");

    console.log(searchParams);

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!conversationId) {
      return new NextResponse("ConversationId is missing", { status: 400 });
    }

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            memberOne: {
              userId: profile.id,
            },
          },
          {
            memberTwo: {
              userId: profile.id,
            },
          },
        ],
      },
      include: {
        memberOne: {
          include: {
            user: true,
          },
        },
        memberTwo: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!conversation) {
      return new NextResponse("Conversation is not found", { status: 404 });
    }

    const member =
      conversation.memberOne.userId === profile.id
        ? conversation.memberOne
        : conversation.memberTwo;

    if (!member) {
      return new NextResponse("Member not found", { status: 404 });
    }

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: params.directMessageId as string,
        conversationId: conversationId as string,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!directMessage || directMessage?.deleted) {
      return new NextResponse("Message not found", { status: 404 });
    }

    const isMessageOwner = directMessage?.memberId === member.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const canModify = isMessageOwner || isAdmin || isModerator;

    if (!canModify) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    directMessage = await db.directMessage.update({
      where: {
        id: params.directMessageId as string,
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

    const updateKey = `chat:${conversationId}:messages:update`;

    res?.socket?.server?.io?.emit(updateKey, directMessage);

    return NextResponse.json(directMessage);
  } catch (error) {
    console.log("[MESSAGES_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { directMessageId: string } },
  res: NextApiResponseServerIo
) {
  try {
    const profile = await currentUser();
    const { searchParams } = new URL(req.url!);

    const { content } = await req.json();
    const conversationId = searchParams.get("conversationId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!conversationId) {
      return new NextResponse("ConversationId is missing", { status: 400 });
    }

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            memberOne: {
              userId: profile.id,
            },
          },
          {
            memberTwo: {
              userId: profile.id,
            },
          },
        ],
      },
      include: {
        memberOne: {
          include: {
            user: true,
          },
        },
        memberTwo: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!conversation) {
      return new NextResponse("Conversation is not found", { status: 404 });
    }

    const member =
      conversation.memberOne.userId === profile.id
        ? conversation.memberOne
        : conversation.memberTwo;

    if (!member) {
      return new NextResponse("Member not found", { status: 404 });
    }

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: params.directMessageId as string,
        conversationId: conversationId as string,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!directMessage || directMessage?.deleted) {
      return new NextResponse("Message not found", { status: 404 });
    }

    const isMessageOwner = directMessage?.memberId === member.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const canModify = isMessageOwner || isAdmin || isModerator;

    if (!canModify) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    directMessage = await db.directMessage.update({
      where: {
        id: params.directMessageId as string,
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

    const updateKey = `chat:${conversationId}:messages:update`;

    res?.socket?.server?.io?.emit(updateKey, directMessage);

    return NextResponse.json(directMessage);
  } catch (error) {
    console.log("[MESSAGES_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
