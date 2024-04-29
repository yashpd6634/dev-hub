"use client";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
  userId: string;
}

const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((result) =>
          toast.success(`User ${result.blocked.username} unblocked`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Button
      variant="link"
      size="sm"
      disabled={isPending}
      onClick={onClick}
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};

export default UnblockButton;
