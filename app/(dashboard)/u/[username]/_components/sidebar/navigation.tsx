"use client";

import {
  Fullscreen,
  KeyRound,
  MessageSquare,
  Users,
  icons,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import NavItem, { NavItemSkeleton } from "./nav-item";
import { useCurrentUser } from "@/hooks/use-current-user";

const Navigation = () => {
  const pathname = usePathname();
  const user = useCurrentUser();

  if (!user) throw new Error("User is not available");
  if (!user.username) throw new Error("Username is not given");

  const routes = [
    {
      label: "Stream",
      href: `/u/${encodeURIComponent(user?.username)}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${encodeURIComponent(user?.username)}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${encodeURIComponent(user?.username)}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${encodeURIComponent(user?.username)}/community`,
      icon: Users,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
          isActive={route.href === pathname}
        />
      ))}
    </ul>
  );
};

export default Navigation;
