"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "@/components/server/modals/create-server-modal";
import InviteModal from "@/components/server/modals/invite-modal";
import EditServerModal from "@/components/server/modals/edit-server-modal";
import MembersModal from "@/components/server/modals/members-modal";
import CreateChannelModal from "../server/modals/create-channel-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
    </>
  );
};
