"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  /** Extra delay after trigger (seconds). */
  delay?: number;
};

/**
 * One-shot fade + rise when the element enters the viewport.
 * No blur / no scrub — stays readable on mobile.
 */
export default function ScrollReveal({
  children,
  className = "",
  containerClassName = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: isMobile ? 20 : 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.45 : 0.6,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: isMobile ? "top 88%" : "top 82%",
            once: true,
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: ref, dependencies: [delay] },
  );

  return (
    <div className={containerClassName}>
      <div ref={ref} className={className} style={{ opacity: 0 }}>
        {children}
      </div>
    </div>
  );
}
