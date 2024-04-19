"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import CopyButton from "./copu-button";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KeyCardProps {
  value: string | null;
}

const KeyCard = ({ value }: KeyCardProps) => {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={showKey ? "text" : "password"}
              disabled
              placeholder="Stream key"
            />
            <Button
              onClick={() => setShowKey(!showKey)}
              size="sm"
              variant="ghost"
            >
              {showKey ? (
                <EyeOff style={{ color: "#96969d" }} />
              ) : (
                <Eye style={{ color: "#96969d" }} />
              )}
            </Button>
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyCard;
