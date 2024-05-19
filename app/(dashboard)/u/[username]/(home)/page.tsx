import { currentUser } from "@/actions/user";
import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { Fallback } from "@radix-ui/react-avatar";
import React from "react";

interface CreaterPageProps {
  params: {
    username: string;
  };
}

const CreaterPage = async ({ params }: CreaterPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(decodeURIComponent(params.username));

  if (!user || user.id !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }
  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
};

export default CreaterPage;
