"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "../server/modals/create-server-modal";
import InviteModal from "../server/modals/invite-modal";
import EditServerModal from "../server/modals/edit-server-modal";

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
    </>
  );
};
