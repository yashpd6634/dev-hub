"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "@/components/server/modals/create-server-modal";
import InviteModal from "@/components/server/modals/invite-modal";
import EditServerModal from "@/components/server/modals/edit-server-modal";
import MembersModal from "@/components/server/modals/members-modal";
import CreateChannelModal from "../server/modals/create-channel-modal";
import LeaveServerModal from "../server/modals/leave-server-modal";
import DeleteServerModal from "../server/modals/delete-server-modal";
import DeleteChannelModal from "../server/modals/delete-channel-modal";
import EditChannelModal from "../server/modals/edit-channel-modal";
import MessageFileModal from "../server/modals/message-file-modal";
import DeleteMessageModal from "../server/modals/delete-message-modal";

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
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  );
};
