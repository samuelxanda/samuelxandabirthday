import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — same birthday “S” mark. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(145deg, #FF5D7D 0%, #FFC857 48%, #B8A1FF 100%)",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 700,
            color: "#FFF8EE",
            fontFamily: 'Georgia, "Times New Roman", serif',
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginTop: -4,
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size },
  );
}
