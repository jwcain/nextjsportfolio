"use client";
import { useEffect, useState } from "react";

type CopyButtonProps = {
  textToCopy: string;
};

export default function CopyButton({ textToCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 text-white bg-black/10 shadow-md rounded-lg hover:bg-black/20 transition-colors"
        onClick={handleCopy}
      >
        <img
          className="w-6 h-6"
          src={copied ? "/ok.svg" : "/copy.svg"}
          alt="copy icon"
        />
        {copied ? "Copied!" : textToCopy}
      </button>
    </div>
  );
}
