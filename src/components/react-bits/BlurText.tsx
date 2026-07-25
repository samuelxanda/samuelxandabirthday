"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "words" | "letters";
};

export default function BlurText({
  text,
  className = "",
  delay = 80,
  animateBy = "words",
}: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const parts =
    animateBy === "words" ? text.split(" ") : text.split("");

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const els = ref.current.querySelectorAll(".blur-unit");
      gsap.fromTo(
        els,
        { opacity: 0, filter: "blur(12px)", y: 12 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { dependencies: [text, delay, animateBy], scope: ref },
  );

  return (
    <p ref={ref} className={className} aria-label={text}>
      {parts.map((part, i) => (
        <span key={`${part}-${i}`} className="blur-unit inline-block">
          {part}
          {animateBy === "words" && i < parts.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </p>
  );
}
