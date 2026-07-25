import { ImageResponse } from "next/og";
import { SITE } from "@/lib/config";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = `${SITE.name}'s birthday — leave a private note`;

/** Shared 1200×630 share card for Open Graph + Twitter. */
export function createOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background:
            "radial-gradient(ellipse 120% 90% at 50% 110%, #FF5D7D 0%, #FF8A6A 22%, #FFC857 48%, #E8B4D8 72%, #B8A1FF 90%, #FFF8EE 100%)",
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        {/* Soft ivory vignette for text readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 55% 50% at 50% 45%, rgba(255,248,238,0.72) 0%, rgba(255,248,238,0.2) 55%, transparent 75%)",
          }}
        />
        {/* Corner glow accents (no CSS filter — Satori/OG runtime) */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 460,
            height: 460,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255, 200, 87, 0.55) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            right: -60,
            width: 520,
            height: 520,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(184, 161, 255, 0.55) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "64px 80px",
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#8B1E3F",
              fontFamily: 'ui-monospace, "Courier New", monospace',
              fontWeight: 600,
              marginBottom: 28,
            }}
          >
            Private notes
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#211824",
              fontWeight: 700,
              marginBottom: 28,
            }}
          >
            {SITE.headline}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.4,
              color: "#3D2A3A",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 500,
              maxWidth: 860,
            }}
          >
            A wish, honest advice, something he could change, or a truth you
            wish he knew — only he will read it.
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
    },
  );
}
