"use client";

import { FadeContent, ScrollReveal } from "@/components/react-bits";
import { BirthdayBackdrop } from "@/components/ui/BirthdayBackdrop";
import { SITE, STORY_BEATS } from "@/lib/config";

function groupBeats(beats: typeof STORY_BEATS) {
  const groups: { kind: string; items: (typeof STORY_BEATS)[number][] }[] = [];
  for (const beat of beats) {
    const last = groups[groups.length - 1];
    if (last && last.kind === beat.kind) {
      last.items.push(beat);
    } else {
      groups.push({ kind: beat.kind, items: [beat] });
    }
  }
  return groups;
}

export function KnowSamuel() {
  const groups = groupBeats(STORY_BEATS);

  return (
    <section className="act act-know" aria-labelledby="know-heading">
      <BirthdayBackdrop variant="soft" className="know-backdrop" />

      <div className="act-know-inner">
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

        <div className="story-groups">
          {groups.map((group) => (
            <section key={group.kind} className="story-group" aria-label={group.kind}>
              {group.items.map((beat, index) => (
                <ScrollReveal
                  key={beat.id}
                  containerClassName="story-beat-reveal"
                  delay={index === 0 ? 0 : 0.05}
                >
                  {index === 0 ? (
                    <p className="story-beat-kind">{group.kind}</p>
                  ) : null}
                  <article className="story-beat-card">
                    <p className="story-beat-text">{beat.text}</p>
                  </article>
                </ScrollReveal>
              ))}
            </section>
          ))}
        </div>

        <ScrollReveal containerClassName="know-focus-wrap">
          <p className="know-closer">
            Now leave {SITE.name} something only he will read.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
