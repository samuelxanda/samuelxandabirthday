"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type FadeContentProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  blur?: boolean;
  /** Hero content should use mount so it animates without waiting for scroll. */
  trigger?: "scroll" | "mount";
}

const fromMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export default function FadeContent({
  children,
  className = "",
  direction = "up",
  duration = 0.85,
  delay = 0,
  blur = false,
  trigger = "scroll",
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(ref.current, { opacity: 1, clearProps: "all" });
        return;
      }
      const from = fromMap[direction];
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          ...from,
          filter: blur && !window.matchMedia("(max-width: 768px)").matches
            ? "blur(10px)"
            : "none",
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          duration: window.matchMedia("(max-width: 768px)").matches
            ? Math.min(duration, 0.55)
            : duration,
          delay,
          ease: "power3.out",
          clearProps: "filter",
          ...(trigger === "scroll"
            ? {
                scrollTrigger: {
                  trigger: ref.current,
                  start: "top 92%",
                  once: true,
                },
              }
            : {}),
        },
      );
    },
    { dependencies: [direction, duration, delay, blur, trigger], scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
