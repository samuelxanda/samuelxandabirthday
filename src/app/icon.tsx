import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Birthday favicon — coral/lilac “S” mark. */
export default function Icon() {
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
          borderRadius: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 38,
            fontWeight: 700,
            color: "#FFF8EE",
            fontFamily: 'Georgia, "Times New Roman", serif',
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginTop: -2,
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size },
  );
}
