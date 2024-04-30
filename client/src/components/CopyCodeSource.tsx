"use client";

import { useState } from "react";
import { Copy, ClipboardCheck } from "lucide-react";


export default function CopyCodeSource({ Script }: { Script: string | null}) {
  const [copied, setCopied] = useState(false);
  const scriptCode = Script || "No script available";

  function handleClick() {
    navigator.clipboard.writeText(scriptCode)
      .then(() => setCopied(true))
      .catch((error) => console.error("Failed to copy script: ", error));

    setTimeout(() => setCopied(false), 1000); // Reset copied state after 1 second
  }

  return (
    <div className="dark bg-gray-100 rounded-md">
      <div className="flex items-center relative text-token-text-secondary bg-gray-200 px-4 py-2 text-xs font-sans justify-between rounded-t-md">
        <span>Code</span>
        <span className="" data-state="closed">
            <div className="flex gap-1 items-center cursor-pointer" onClick={handleClick}>
            {copied ? (
            <>
              <Copy size={15} />
            </>
          ) : (
            <>
              <ClipboardCheck size={20} />
            </>
          )}
              {copied ? "Copied!" : "Copy code"}
            </div>
        </span>
      </div>
      <pre className="p-4 text-xs text-black">
        {scriptCode } 
      </pre>
    </div>
  );
}
