import Hint from "@/components/hint";
import UserAvatar from "@/components/user-avatar";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Channel, Server } from "@prisma/client";
import React from "react";

type ParticipantsProps = {
  board: ChannelWithServer | null | undefined;
};

type ChannelWithServer = Channel & {
  server: Server;
};

const MAX_SHOWN_USERS = 2;

const Participants = ({ board }: ParticipantsProps) => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className="absolute z-10 h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <Hint label={info.name} side="bottom">
              <UserAvatar
                key={connectionId}
                imageUrl={info.avatar}
                username={info.name}
                isLive={true}
              />
            </Hint>
          );
        })}
        {currentUser && (
          <Hint label={currentUser.info.name} side="bottom">
            <UserAvatar
              imageUrl={currentUser.info.avatar}
              username={`${currentUser.info.avatar} (You)`}
              isLive={true}
            />
          </Hint>
        )}
        {hasMoreUsers && (
          <Hint label={`${users.length - MAX_SHOWN_USERS} more`} side="bottom">
            <UserAvatar
              username={`${users.length - MAX_SHOWN_USERS} more`}
              imageUrl={board?.server?.imageUrl!}
              isLive={true}
            />
          </Hint>
        )}
      </div>
    </div>
  );
};

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
  );
};

export default Participants;
