"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const followHandler = () => {
    startTransition(async () => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const unFollowHandler = () => {
    startTransition(async () => {
      onUnfollow(userId)
        .then((data) => toast.success(`Unfollowed ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const clickHandler = () => {
    if (isFollowing) unFollowHandler();
    else followHandler();
  };

  const blockHandler = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`Blocked the user ${data ? data.blocked.username : ""}`)
        )
        .catch((data) => toast.error(`Something went wrong`));
    });
  };

  return (
    <>
      <Button disabled={isPending} onClick={clickHandler} variant="primary">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button disabled={isPending} onClick={blockHandler}>
        Block
      </Button>
    </>
  );
};

export default Actions;
