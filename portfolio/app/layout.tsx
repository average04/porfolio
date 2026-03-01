import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-custom",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Jay-R Bayog",
  description: "Portfolio of Jay-R Bayog — full-stack .NET and React engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
