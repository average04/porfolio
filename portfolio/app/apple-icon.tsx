import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: 140,
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#4F9EFF" }}>{"<"}</span>
          <span style={{ color: "#ffffff" }}>J</span>
          <span style={{ color: "#4F9EFF" }}>{">"}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
