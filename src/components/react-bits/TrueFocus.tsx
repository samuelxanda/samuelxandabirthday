"use client";

import { useEffect, useState } from "react";

type TrueFocusProps = {
  sentence: string;
  className?: string;
  animationDuration?: number;
  pauseBetween?: number;
};

/**
 * Cycles a soft highlight across words. All words stay fully readable —
 * no blur, no heavy fade (those made this section hard to scan).
 */
export default function TrueFocus({
  sentence,
  className = "",
  animationDuration = 0.4,
  pauseBetween = 1400,
}: TrueFocusProps) {
  const words = sentence.split(" ");
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(reduce.matches);
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % words.length);
    }, pauseBetween);
    return () => window.clearInterval(id);
  }, [pauseBetween, reduced, words.length]);

  return (
    <p className={`know-focus-words ${className}`.trim()}>
      {words.map((word, i) => {
        const isActive = reduced || i === active;
        return (
          <span
            key={`${word}-${i}`}
            className={`know-focus-word${isActive ? " is-active" : ""}`}
            style={{
              transitionDuration: `${animationDuration}s`,
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}
