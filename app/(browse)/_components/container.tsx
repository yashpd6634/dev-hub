"use client";
import React, { ReactNode, useEffect } from "react";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};

export default Container;
