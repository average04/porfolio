import type { Metadata } from "next";
import {
  Barlow_Condensed,
  Instrument_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const barlow = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const instrument = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jayrb.dev"),
  title: "Jay-R Bayog — Software Engineer",
  description:
    "Full-stack software engineer. .NET, React, Azure. Building thoughtful products and dependable systems since 2019.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} ${instrument.variable} ${mono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
