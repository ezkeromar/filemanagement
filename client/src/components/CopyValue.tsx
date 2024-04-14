"use client";

import { useState } from "react";
import { Copy, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState("");

  function handleClick() {
    let l = value;
    setCopied(l);
    navigator.clipboard.writeText(l);
    setTimeout(() => setCopied(""), 1000); // 1 second
  }

  return (
    <div className="flex-start rounded-lg bg-[#D9D9D933]">
      <div className="flex-1 px-4 text-start line-clamp-1">
        {value}
      </div>
      <Button
        size="sm"
        className="shrink-0 w-[90px] flex-center gap-1 bg-[#74768c] hover:bg-[#7d7f9b] rounded-lg"
        onClick={handleClick}
        disabled={copied !== ""}
      >
        {copied === "" ? (
          <>
            <span>Copy</span>
            <Copy size={15} />
          </>
        ) : (
          <>
            <span>Copied</span>
            <ClipboardCheck size={20} />
          </>
        )}
      </Button>
    </div>
  );
}
