import React from "react";
import dynamic from "next/dynamic";

const CreateUsername = dynamic(
  () => import("@/components/auth/create-username"),
  {
    ssr: false,
  }
);

const CreateUsernamePage = () => {
  return <CreateUsername />;
};

export default CreateUsernamePage;
