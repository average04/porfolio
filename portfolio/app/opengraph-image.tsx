import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jay-R Bayog — Software Engineer";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0C0A08",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 100px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(79,158,255,0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Left — name + info */}
        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          {/* JAY-R */}
          <div
            style={{
              fontWeight: 900,
              fontSize: 118,
              color: "#EDE0C0",
              lineHeight: 0.88,
              letterSpacing: "-3px",
            }}
          >
            JAY-R
          </div>
          {/* BAYOG. */}
          <div
            style={{
              fontWeight: 900,
              fontSize: 118,
              color: "#4F9EFF",
              lineHeight: 0.88,
              letterSpacing: "-3px",
              marginBottom: 40,
            }}
          >
            BAYOG.
          </div>

          {/* Divider */}
          <div style={{ width: 420, height: 1, background: "rgba(238,220,180,0.15)", marginBottom: 28 }} />

          <div style={{ fontWeight: 600, fontSize: 18, color: "#8A7860", letterSpacing: "4px", textTransform: "uppercase" }}>
            Full-Stack Software Engineer
          </div>
          <div style={{ fontWeight: 400, fontSize: 14, color: "#4A3D2A", letterSpacing: "3px", marginTop: 10, textTransform: "uppercase" }}>
            .NET · React · Azure · 6 yrs exp
          </div>

          {/* URL */}
          <div style={{ fontWeight: 500, fontSize: 14, color: "#4F9EFF", letterSpacing: "3px", marginTop: 40, textTransform: "uppercase" }}>
            jayrb.dev
          </div>
        </div>

        {/* Right — large <J> mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: 240,
            lineHeight: 1,
            zIndex: 1,
            opacity: 0.85,
          }}
        >
          <span style={{ color: "#4F9EFF", opacity: 0.5 }}>{"<"}</span>
          <span style={{ color: "#EDE0C0" }}>J</span>
          <span style={{ color: "#4F9EFF", opacity: 0.5 }}>{">"}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
