"use client";
import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import React, { useState } from "react";

interface CopyButtonProps {
  value?: string;
}

const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (!value) return;

    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      onClick={onCopy}
      variant="ghost"
      disabled={!value || isCopied}
      size="sm"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};

export default CopyButton;
