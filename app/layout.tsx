import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Career Resonance Map",
  description: "A therapeutic tool for mapping your job history",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
