"use client";

import { useEffect, useState } from "react";

type TrueFocusProps = {
  sentence: string;
  className?: string;
  blurAmount?: number;
  animationDuration?: number;
  pauseBetween?: number;
};

export default function TrueFocus({
  sentence,
  className = "",
  blurAmount = 5,
  animationDuration = 0.45,
  pauseBetween = 1200,
}: TrueFocusProps) {
  const words = sentence.split(" ");
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [softMode, setSoftMode] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 768px)");
    const sync = () => {
      setReduced(reduce.matches);
      setSoftMode(mobile.matches);
    };
    sync();
    reduce.addEventListener("change", sync);
    mobile.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      mobile.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % words.length);
    }, pauseBetween);
    return () => window.clearInterval(id);
  }, [pauseBetween, reduced, words.length]);

  const effectiveBlur = softMode ? 0 : blurAmount;

  return (
    <p className={`flex flex-wrap justify-center gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const isActive = reduced || i === active;
        return (
          <span
            key={`${word}-${i}`}
            style={{
              filter: isActive || effectiveBlur === 0
                ? "none"
                : `blur(${effectiveBlur}px)`,
              opacity: isActive ? 1 : softMode ? 0.55 : 0.7,
              transform: isActive ? "scale(1.04)" : "scale(1)",
              transition: `filter ${animationDuration}s ease, opacity ${animationDuration}s ease, transform ${animationDuration}s ease`,
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}
