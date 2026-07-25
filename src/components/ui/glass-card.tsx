import type { HTMLAttributes, ReactNode } from "react";

/**
 * Glassmorphism shell adapted from 21st.dev Glass Card
 * (molecule-lab-rushil/glass-card) — birthday palette via `.panel` tokens.
 */
export function GlassCard({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  return (
    <div className={`panel glass-card ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
