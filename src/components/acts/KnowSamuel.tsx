"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BirthdayBackdrop } from "@/components/ui/BirthdayBackdrop";
import { SITE, STORY_BEATS } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
    kind: "Your turn",
    text: `Now leave ${SITE.name} something only he will read.`,
    isCloser: true,
  },
];

export function KnowSamuel() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [staticMode, setStaticMode] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const slides = slideRefs.current.filter(Boolean) as HTMLElement[];
      if (!section || !pin || slides.length === 0) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setStaticMode(true);
        gsap.set(slides, { clearProps: "all", autoAlpha: 1, y: 0 });
        return;
      }

      setStaticMode(false);
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const perSlide = isMobile ? 0.75 : 0.9;

      gsap.set(slides, { autoAlpha: 0, y: 28 });
      gsap.set(slides[0], { autoAlpha: 1, y: 0 });
      setActive(0);

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          pin: pin,
          scrub: isMobile ? 0.55 : 0.7,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * perSlide * slides.length)}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              slides.length - 1,
              Math.floor(self.progress * slides.length + 0.001),
            );
            setActive((prev) => (prev === idx ? prev : idx));
          },
        },
      });

      slides.forEach((slide, i) => {
        if (i === 0) return;
        const prev = slides[i - 1];
        const at = i;
        tl.to(prev, { autoAlpha: 0, y: -22, duration: 0.55 }, at);
        tl.fromTo(
          slide,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.55 },
          at,
        );
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [] },
  );

  return (
    <section
      ref={sectionRef}
      className={`act act-know${staticMode ? " is-static" : ""}`}
      aria-labelledby="know-heading"
    >
      <div ref={pinRef} className="know-pin">
        <BirthdayBackdrop variant="soft" className="know-backdrop" />

        <div className="know-pin-inner">
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

          <div className="know-stage" aria-live="polite">
            {SLIDES.map((slide, index) => (
              <article
                key={slide.id}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className={`know-slide${slide.isCloser ? " is-closer" : ""}${
                  staticMode || active === index ? " is-active" : ""
                }`}
                aria-hidden={staticMode ? undefined : active !== index}
              >
                <p className="story-beat-kind">{slide.kind}</p>
                <div className="story-beat-card">
                  <p className="story-beat-text">{slide.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="know-progress" aria-hidden>
            {SLIDES.map((slide, index) => (
              <span
                key={slide.id}
                className={`know-progress-dot${active === index ? " is-active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
