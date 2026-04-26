import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
            fontSize: 40,
            lineHeight: 1,
            gap: 0,
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
