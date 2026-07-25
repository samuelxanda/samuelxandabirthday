"use client";

import { useEffect, useState } from "react";
import { GradientBackground } from "@/components/ui/noisy-gradient-backgrounds";

/**
 * Vivid coral → marigold → lilac wash.
 * Keep saturated stops through the viewport — fading to ivory made this
 * look like a flat page background under the old vignette.
 */
const BIRTHDAY_COLORS = [
  { color: "rgba(255,93,125,1)", stop: "0%" },
  { color: "rgba(255,120,100,1)", stop: "18%" },
  { color: "rgba(255,200,87,1)", stop: "42%" },
  { color: "rgba(238,174,202,1)", stop: "68%" },
  { color: "rgba(184,161,255,1)", stop: "88%" },
  { color: "rgba(148,201,233,1)", stop: "100%" },
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
        gradientSize="140% 140%"
        colors={BIRTHDAY_COLORS}
        enableNoise={!reduceMotion}
        noiseIntensity={mobile ? 0.85 : 1.1}
        noisePatternSize={mobile ? 100 : 85}
        noisePatternAlpha={mobile ? 36 : 48}
        noisePatternRefreshInterval={reduceMotion ? 0 : mobile ? 3 : 2}
      />
      <div className="arrival-vignette" />
    </div>
  );
}
