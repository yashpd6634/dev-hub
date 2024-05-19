import { currentUser } from "@/actions/user";
import LoginButton from "@/components/auth/login-button";
import UserButton from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { Clapperboard } from "lucide-react";
import Link from "next/link";
import React from "react";

const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <LoginButton>
          <Button size="sm" variant="primary">
            Login
          </Button>
        </LoginButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`u/${encodeURIComponent(user.username)}`}>
              <Clapperboard />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton/>
        </div>
      )}
    </div>
  );
};

export default Actions;
