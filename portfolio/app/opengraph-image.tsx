import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Jay-R Bayog, a software engineer in Metro Manila who builds .NET and Azure systems.";

export default async function OpenGraphImage() {
  const [medium, bold] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/AtkinsonHyperlegibleNext-Medium.ttf")),
    readFile(join(process.cwd(), "app/fonts/AtkinsonHyperlegibleNext-Bold.ttf")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#0038a8",
        color: "#ffffff",
        fontFamily: "Atkinson",
      }}
    >
      <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
        Jay-R Bayog
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 58,
          fontWeight: 500,
          lineHeight: 1.18,
          letterSpacing: "-0.015em",
          maxWidth: 1000,
        }}
      >
        Software engineer in Metro Manila. I build .NET and Azure systems,
        and apps like Kamee Fitness and BetterSurallah.
      </div>
      <div style={{ display: "flex", fontSize: 30, color: "#c7d3ee" }}>
        jayrb.dev
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Atkinson", data: medium, weight: 500, style: "normal" },
        { name: "Atkinson", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
