import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

if (typeof window !== "undefined" && token) {
  posthog.init(token, {
    api_host: "/ingest",
    ui_host: host.includes("eu.") ? "https://eu.posthog.com" : "https://us.posthog.com",
    defaults: "2026-05-30",
    capture_pageview: true,
    capture_pageleave: true,
    capture_exceptions: true,
    persistence: "localStorage+cookie",
    person_profiles: "identified_only",
  });
}
