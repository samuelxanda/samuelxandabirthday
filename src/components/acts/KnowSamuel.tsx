import { BirthdayBackdrop } from "@/components/ui/BirthdayBackdrop";
import { SITE, STORY_BEATS } from "@/lib/config";

type Slide =
  | { id: string; kind: string; text: string; isCloser?: false }
  | { id: "closer"; kind: string; text: string; isCloser: true };

const SLIDES: Slide[] = [
  ...STORY_BEATS.map((beat) => ({
    id: beat.id,
    kind: beat.kind,
    text: beat.text,
  })),
  {
    id: "closer",
    kind: "Private note",
    text: `Now leave ${SITE.name} a private note — a wish, honest advice, something he could change, or a truth you wish he knew.`,
    isCloser: true,
  },
];

export function KnowSamuel() {
  return (
    <section className="act act-know" aria-labelledby="know-heading">
      <div className="know-shell">
        <BirthdayBackdrop variant="soft" className="know-backdrop" />

        <div className="know-inner">
          <header className="know-header">
            <p className="mono-label">A few quiet truths</p>
            <h2 id="know-heading" className="section-title">
              Things you might not know
            </h2>
            <p className="section-sub">
              What he builds by, what he holds onto, and what he&apos;s still
              learning.
            </p>
          </header>

          <div className="know-stage">
            {SLIDES.map((slide) => (
              <article
                key={slide.id}
                className={`know-slide${slide.isCloser ? " is-closer" : ""}`}
              >
                <p className="story-beat-kind">{slide.kind}</p>
                <div className="story-beat-card">
                  <p className="story-beat-text">{slide.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
