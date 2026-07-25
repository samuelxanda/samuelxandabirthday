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

      // Once (not scrub) so text never gets stuck mid-blur while scrolling.
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: isMobile ? 18 : 28,
          filter: isMobile ? "none" : "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: isMobile ? 0.45 : 0.7,
          ease: "power2.out",
          clearProps: "filter",
          scrollTrigger: {
            trigger: ref.current,
            start: isMobile ? "top 92%" : "top 85%",
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
