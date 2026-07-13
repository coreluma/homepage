import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dmSerifText = localFont({
  src: "../../public/fonts/dm-serif-text-regular.ttf",
  display: "swap",
  variable: "--font-dm-serif-text",
});

export const metadata: Metadata = {
  title: "Core Luma — Product Studio",
  description: "Building the core, illuminating the experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${dmSerifText.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
