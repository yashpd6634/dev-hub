import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetOverlay, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import ServerSidebar from "./server/sidebar/server-sidebar";

type MobileToggleProps = {
  serverId: string;
};

const MobileToggle = ({ serverId }: MobileToggleProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden" variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="mt-20 ml-[70px] p-0 w-50 flex gap-0 z-40">
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileToggle;
