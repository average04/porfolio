import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const bold = await readFile(
    join(process.cwd(), "app/fonts/AtkinsonHyperlegibleNext-Bold.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0038a8",
        color: "#ffffff",
        fontFamily: "Atkinson",
        fontWeight: 700,
        fontSize: 132,
        lineHeight: 1,
      }}
    >
      J
    </div>,
    {
      ...size,
      fonts: [{ name: "Atkinson", data: bold, weight: 700, style: "normal" }],
    },
  );
}
