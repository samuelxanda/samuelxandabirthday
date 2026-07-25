"use client";

import { SITE } from "@/lib/config";
import { FadeContent } from "@/components/react-bits";
import { ShareMoment } from "@/components/ShareMoment";

export function ClosingMoment() {
  return (
    <section className="act act-closing" aria-labelledby="closing-heading">
      <FadeContent>
        <p className="mono-label">Before you go</p>
        <h2 id="closing-heading" className="section-title">
          Thanks for being in the room
        </h2>
        <p className="section-sub closing-sub">
          Share this page with someone who knows {SITE.name}, or come back
          later. When you&apos;re ready to leave a private note, use the pin in
          the top right.
        </p>
      </FadeContent>

      <div className="closing-actions">
        <ShareMoment compact />
      </div>
    </section>
  );
}
