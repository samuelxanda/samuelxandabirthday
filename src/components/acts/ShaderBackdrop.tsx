"use client";

import { useEffect, useState } from "react";
import { GradientBackground } from "@/components/ui/noisy-gradient-backgrounds";

/** Warm celebratory wash — coral → marigold → lilac → ivory */
const BIRTHDAY_COLORS = [
  { color: "rgba(255,93,125,1)", stop: "8%" },
  { color: "rgba(255,140,120,1)", stop: "22%" },
  { color: "rgba(255,200,87,1)", stop: "42%" },
  { color: "rgba(238,190,210,1)", stop: "62%" },
  { color: "rgba(184,161,255,0.95)", stop: "82%" },
  { color: "rgba(255,248,238,1)", stop: "100%" },
];

export function ShaderBackdrop() {
  const [mobile, setMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

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
    <div className="arrival-backdrop" aria-hidden>
      <GradientBackground
        gradientOrigin="bottom-middle"
        gradientSize="130% 130%"
        colors={BIRTHDAY_COLORS}
        enableNoise={!reduceMotion}
        noiseIntensity={mobile ? 0.7 : 1}
        noisePatternSize={mobile ? 110 : 90}
        noisePatternAlpha={mobile ? 28 : 40}
        noisePatternRefreshInterval={reduceMotion ? 0 : mobile ? 3 : 2}
      />
      <div className="arrival-vignette" />
    </div>
  );
}
