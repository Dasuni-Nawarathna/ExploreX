"use client";

import React, { useState } from "react";
import { 
  Share2, 
  Copy, 
  Check, 
  MessageCircle 
} from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? url || window.location.href : "";

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title} - Discover Sri Lanka with ExploreX: ${shareUrl}`
  )}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Check out ${title} on ExploreX Travel Agency!`
  )}&url=${encodeURIComponent(shareUrl)}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-stone-400 font-semibold flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5" />
        <span>Share:</span>
      </span>

      {/* WhatsApp Share */}
      <a
        href={whatsappShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5" />
      </a>

      {/* Twitter / X */}
      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 px-2 rounded-lg bg-stone-100 text-stone-800 hover:bg-stone-200 transition font-bold text-[11px] flex items-center"
        title="Share on X (Twitter)"
      >
        𝕏
      </a>

      {/* Facebook */}
      <a
        href={facebookShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 px-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition font-bold text-[10px] flex items-center"
        title="Share on Facebook"
      >
        fb
      </a>

      {/* Copy link button */}
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 transition font-medium text-[11px]"
        title="Copy Link to Clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3 text-stone-500" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
