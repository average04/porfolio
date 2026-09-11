import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jay-R Bayog — Serious code. Curious mind.";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#10110f",
        color: "#eeeee5",
        display: "flex",
        flexDirection: "column",
        padding: "55px 70px",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 16,
          letterSpacing: "2px",
          color: "#7ab8ff",
        }}
      >
        <span>JAY-R BAYOG</span>
        <span>SOFTWARE ENGINEER</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 92,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-5px",
          marginTop: 85,
        }}
      >
        <span>SERIOUS CODE.</span>
        <span style={{ color: "#7ab8ff" }}>CURIOUS MIND.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
          borderTop: "1px solid #3a4031",
          paddingTop: 25,
          fontSize: 15,
          color: "#afb5a3",
        }}
      >
        <span>.NET / React / Azure</span>
        <span>jayrb.dev ↗</span>
      </div>
    </div>,
    { ...size },
  );
}
