"use client";

import {
  FadeContent,
  ScrollReveal,
  TrueFocus,
} from "@/components/react-bits";
import { SITE, STORY_BEATS, STORY_FOCUS } from "@/lib/config";

export function KnowSamuel() {
  return (
    <section className="act act-know" aria-labelledby="know-heading">
      <FadeContent>
        <p className="mono-label">A few quiet truths</p>
        <h2 id="know-heading" className="section-title">
          Things you might not know
        </h2>
        <p className="section-sub">
          What he builds by, what he holds onto, and what he&apos;s still
          learning.
        </p>
      </FadeContent>

      <div className="story-beats">
        {STORY_BEATS.map((beat) => (
          <ScrollReveal key={beat.id} containerClassName="story-beat">
            <p className="story-beat-kind">{beat.kind}</p>
            <p className="story-beat-text">{beat.text}</p>
          </ScrollReveal>
        ))}
      </div>

      <FadeContent className="know-focus-wrap" delay={0.1}>
        <TrueFocus
          sentence={STORY_FOCUS}
          className="know-focus"
          blurAmount={2}
          pauseBetween={1100}
        />
        <p className="know-closer">
          Now leave {SITE.name} something only he will read.
        </p>
      </FadeContent>
    </section>
  );
}
