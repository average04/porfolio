import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next } from "next/font/google";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  style: ["normal", "italic"],
  fallback: ["system-ui", "Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jayrb.dev"),
  title: "Jay-R Bayog, software engineer",
  description:
    "Software engineer in Metro Manila working in .NET, React, and Azure. Maker of Kamee Fitness and BetterSurallah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={atkinson.variable}>{children}</body>
    </html>
  );
}
