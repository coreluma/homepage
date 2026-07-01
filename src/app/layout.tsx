import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
