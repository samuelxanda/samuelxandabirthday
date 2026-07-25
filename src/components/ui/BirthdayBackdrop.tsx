"use client";

import { useEffect, useState } from "react";
import { GradientBackground } from "@/components/ui/noisy-gradient-backgrounds";

/** Vivid coral → marigold → lilac wash shared across hero, stages, and modal. */
export const BIRTHDAY_COLORS = [
  { color: "rgba(255,93,125,1)", stop: "0%" },
  { color: "rgba(255,120,100,1)", stop: "18%" },
  { color: "rgba(255,200,87,1)", stop: "42%" },
  { color: "rgba(238,174,202,1)", stop: "68%" },
  { color: "rgba(184,161,255,1)", stop: "88%" },
  { color: "rgba(148,201,233,1)", stop: "100%" },
] as const;

/** Muted wash for story sections — same family, lower saturation for reading. */
export const BIRTHDAY_SOFT_COLORS = [
  { color: "rgba(255,248,238,1)", stop: "0%" },
  { color: "rgba(255,200,210,0.55)", stop: "28%" },
  { color: "rgba(255,224,170,0.45)", stop: "52%" },
  { color: "rgba(220,210,245,0.5)", stop: "78%" },
  { color: "rgba(255,248,238,1)", stop: "100%" },
] as const;

type BirthdayBackdropProps = {
  /** Extra class on the outer wrapper (e.g. arrival-backdrop, stage-backdrop). */
  className?: string;
  /** Soft ivory fade at the bottom — used on the hero so story sections can sit on ivory. */
  showVignette?: boolean;
  /** Fixed full-viewport layer for stages/modal. */
  fixed?: boolean;
  /** `vivid` = hero/stages; `soft` = quiet story wash. */
  variant?: "vivid" | "soft";
};

export function BirthdayBackdrop({
  className = "",
  showVignette = false,
  fixed = false,
  variant = "vivid",
}: BirthdayBackdropProps) {
  const [mobile, setMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const soft = variant === "soft";

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMobile(mq.matches);
      setReduceMotion(motionMq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    motionMq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      motionMq.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div
      className={`birthday-backdrop ${fixed ? "birthday-backdrop-fixed" : ""} ${soft ? "birthday-backdrop-soft" : ""} ${className}`.trim()}
      aria-hidden
    >
      <GradientBackground
        gradientOrigin={soft ? "top-middle" : "bottom-middle"}
        gradientSize={soft ? "160% 120%" : "140% 140%"}
        colors={[...(soft ? BIRTHDAY_SOFT_COLORS : BIRTHDAY_COLORS)]}
        enableNoise={!reduceMotion && !soft}
        noiseIntensity={mobile ? 0.85 : 1.1}
        noisePatternSize={mobile ? 100 : 85}
        noisePatternAlpha={mobile ? 36 : 48}
        noisePatternRefreshInterval={reduceMotion ? 0 : mobile ? 3 : 2}
      />
      {showVignette ? <div className="arrival-vignette" /> : null}
      {soft ? <div className="know-soft-glow" /> : null}
    </div>
  );
}
