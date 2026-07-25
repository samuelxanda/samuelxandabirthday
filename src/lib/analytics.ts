"use client";

import posthog from "posthog-js";

export function track(event: string, properties?: Record<string, unknown>) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;
  try {
    posthog.capture(event, properties);
  } catch {
    // Analytics must never break the birthday experience.
  }
}
