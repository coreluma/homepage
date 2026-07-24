import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dmSerifText = localFont({
  src: "../../public/fonts/dm-serif-text-regular.ttf",
  display: "swap",
  variable: "--font-dm-serif-text",
});

export const metadata: Metadata = {
  title: "Core Luma",
  description: "Building the core, illuminating the experience.",
  icons: {
    icon: "/images/logo/coreluma-round.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
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
