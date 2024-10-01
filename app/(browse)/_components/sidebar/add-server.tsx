"use client";

import Hint from "@/components/hint";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useModal } from "@/store/use-modal-store";
import { useSidebar } from "@/store/use-sidebar";
import { Plus } from "lucide-react";

export const AddServer = () => {
  const { onOpen } = useModal();
  const user = useCurrentUser();
  const { collapsed } = useSidebar((state) => state);

  if (!user) return null;

  return (
    <div>
      <Hint side="right" align="center" asChild label="Add a server">
        <button
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              size={25}
              className="group-hover:text-white transition text-emerald-500"
            />
          </div>
          {!collapsed && <p className="truncate text-sm">Add a server</p>}
        </button>
      </Hint>
    </div>
  );
};
