"use client";

import type { CSSProperties, ReactNode } from "react";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
};

export default function GradientText({
  children,
  className = "",
  colors = ["#FF5D7D", "#FFC857", "#B8A1FF", "#FF5D7D"],
  animationSpeed = 6,
}: GradientTextProps) {
  const style = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    animation: `gradient-sweep ${animationSpeed}s ease infinite`,
  } as CSSProperties;

  return (
    <span className={`inline-block ${className}`} style={style}>
      {children}
    </span>
  );
}
