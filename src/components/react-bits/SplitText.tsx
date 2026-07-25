"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  textAlign?: "left" | "center" | "right";
  onComplete?: () => void;
};

export default function SplitText({
  text,
  className = "",
  delay = 40,
  duration = 0.8,
  tag = "h1",
  textAlign = "center",
  onComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(
    () => {
      if (!ref.current || reduced) return;
      const chars = ref.current.querySelectorAll(".split-char");
      gsap.fromTo(
        chars,
        { opacity: 0, y: 36, rotateX: -40 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration,
          ease: "power3.out",
          stagger: delay / 1000,
          onComplete,
        },
      );
    },
    { dependencies: [text, delay, duration, reduced], scope: ref },
  );

  useEffect(() => {
    if (reduced) onComplete?.();
  }, [reduced, onComplete]);

  const Tag = tag as ElementType;
  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      className={`split-parent inline-block ${className}`}
      style={{ textAlign, perspective: 600 }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span
              key={`${wi}-${ci}`}
              className="split-char inline-block will-change-transform"
              style={reduced ? undefined : { opacity: 0 }}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}
