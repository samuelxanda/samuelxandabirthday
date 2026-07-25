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
};

export default function ScrollReveal({
  children,
  className = "",
  containerClassName = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(ref.current, { opacity: 1, y: 0, clearProps: "filter" });
        return;
      }

      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      // Fade + rise only — blur made story lines hard to read mid-scroll.
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: isMobile ? 16 : 22,
        },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.4 : 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: isMobile ? "top 94%" : "top 88%",
            once: true,
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div className={containerClassName}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </div>
  );
}
