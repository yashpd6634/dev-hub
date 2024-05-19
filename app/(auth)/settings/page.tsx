import { currentUser } from "@/actions/user";
import React from "react";

const SettingsPage = async () => {
  const session = await currentUser();

  return <div>SettingsPage {JSON.stringify(session)}</div>;
};

export default SettingsPage;
