import { Server, Member, User } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Socket as SocketIOServer } from "socket.io-client";

export type ServerWithMembersWithUsers = Server & {
  members: (Member & { user: User })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
