"use client";

import { FadeContent, ScrollReveal, TrueFocus } from "@/components/react-bits";
import { SITE, STORY_BEATS, STORY_FOCUS } from "@/lib/config";

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
            <ScrollReveal containerClassName="story-group-reveal">
              <p className="story-beat-kind">{group.kind}</p>
              <ul className="story-group-list">
                {group.items.map((beat) => (
                  <li key={beat.id} className="story-beat-text">
                    {beat.text}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </section>
        ))}
      </div>

      <FadeContent className="know-focus-wrap" delay={0.1}>
        <TrueFocus sentence={STORY_FOCUS} className="know-focus" pauseBetween={1400} />
        <p className="know-closer">
          Now leave {SITE.name} something only he will read.
        </p>
      </FadeContent>
    </section>
  );
}
