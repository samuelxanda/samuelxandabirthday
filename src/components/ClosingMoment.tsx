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
          private note with the button in the top right: a wish, honest advice,
          something he could change, or a truth you wish he knew. Only{" "}
          {SITE.name} can read it.
        </p>
      </FadeContent>

      <div className="closing-actions">
        <ShareMoment compact />
      </div>
    </section>
  );
}
