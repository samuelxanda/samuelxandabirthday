"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export function ConfettiBurst({ fire }: { fire: boolean }) {
  useEffect(() => {
    if (!fire) return;

    const end = Date.now() + 1200;
    const colors = ["#FF5D7D", "#FFC857", "#B8A1FF", "#55D6A5", "#62B6FF"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  }, [fire]);

  return null;
}
