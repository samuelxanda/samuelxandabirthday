"use client";

import { useCallback, useState } from "react";
import { SITE } from "@/lib/config";
import { track } from "@/lib/analytics";

type ShareMomentProps = {
  className?: string;
  compact?: boolean;
};

export function ShareMoment({ className = "", compact = false }: ShareMomentProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined" ? window.location.origin : "";

  const sharePage = useCallback(async () => {
    const url = window.location.origin;
    const text = `${SITE.shareText} ${url}`;
    let method: "native_share" | "clipboard" = "clipboard";

    if (navigator.share) {
      try {
        await navigator.share({ title: SITE.headline, text, url });
        method = "native_share";
        track("page_shared", { method });
        return;
      } catch {
        // fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
    track("page_shared", { method });
  }, []);

  return (
    <div className={`share-moment ${compact ? "is-compact" : ""} ${className}`}>
      <button type="button" className="btn-secondary share-btn" onClick={sharePage}>
        {copied ? "Link copied" : "Share this page"}
      </button>
      {!compact && shareUrl ? (
        <p className="share-hint">Bring a friend into the room.</p>
      ) : null}
    </div>
  );
}
