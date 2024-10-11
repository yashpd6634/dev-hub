"use client";

import { Loader } from "lucide-react";
import React from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="h-full w-full relative bg-neutral-100 touch-none text-black flex items-center justify-center">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </div>
  );
};

export default Loading;
