"use client";

import { SplitText, GradientText, FadeContent } from "@/components/react-bits";
import { SITE } from "@/lib/config";
import { ShaderBackdrop } from "./ShaderBackdrop";

export function ArrivalHero() {
  return (
    <section className="act act-arrival" aria-label="Arrival">
      <ShaderBackdrop />

      <div className="act-arrival-inner">
        <div className="arrival-title-wrap">
          <SplitText
            text={SITE.headline}
            tag="h1"
            className="arrival-title"
            delay={35}
            duration={0.9}
          />
          <p className="arrival-gradient-line" aria-hidden>
            <GradientText
              className="arrival-gradient-text"
              animationSpeed={5}
              colors={["#211824", "#8B1E3F", "#3D2A6B", "#211824"]}
            >
              happy birthday · leave a wish
            </GradientText>
          </p>
        </div>

        <FadeContent direction="up" delay={0.35} className="arrival-lede-wrap" trigger="mount">
          <p className="lede arrival-lede">{SITE.subhead}</p>
        </FadeContent>

        <FadeContent direction="up" delay={0.55} trigger="mount">
          <p className="scroll-hint">
            Scroll — get to know him, then leave a birthday wish
          </p>
        </FadeContent>
      </div>
    </section>
  );
}
