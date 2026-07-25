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
          Thanks for celebrating {SITE.name}
        </h2>
        <p className="section-sub closing-sub">
          Share this birthday page with someone who knows him — or leave a
          private birthday wish with the button in the top right. Only{" "}
          {SITE.name} can read what you write.
        </p>
      </FadeContent>

      <div className="closing-actions">
        <ShareMoment compact />
      </div>
    </section>
  );
}
