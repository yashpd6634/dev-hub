import { currentUser } from "@/actions/user";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidV4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentUser();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidV4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ userId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return new NextResponse("server created", { status: 200 });
  } catch (error) {
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
