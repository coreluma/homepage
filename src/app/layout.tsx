import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dmSerifText = localFont({
  src: "../../public/fonts/dm-serif-text-regular.ttf",
  display: "swap",
  variable: "--font-dm-serif-text",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coreluma.kr"),
  title: {
    default: "Core Luma",
    template: "%s | Core Luma",
  },
  description:
    "Core Luma is a two-person product studio building thoughtful digital products with strong design, engineering, and launch execution.",
  keywords: [
    "Core Luma",
    "Product Studio",
    "Digital Product Design",
    "Web Development",
    "Frontend",
    "Backend",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Core Luma",
    description:
      "Core Luma is a two-person product studio building thoughtful digital products with strong design, engineering, and launch execution.",
    url: "/",
    siteName: "Core Luma",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/images/logo/coreluma-round.svg",
        width: 512,
        height: 512,
        alt: "Core Luma logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Core Luma",
    description:
      "Core Luma is a two-person product studio building thoughtful digital products with strong design, engineering, and launch execution.",
    images: ["/images/logo/coreluma-round.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Core Luma",
    url: "https://coreluma.kr",
    logo: "https://coreluma.kr/images/logo/coreluma-round.svg",
    description:
      "Core Luma is a two-person product studio building thoughtful digital products with strong design, engineering, and launch execution.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Core Luma",
    url: "https://coreluma.kr",
    description:
      "Core Luma is a two-person product studio building thoughtful digital products with strong design, engineering, and launch execution.",
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Organization",
      name: "Core Luma",
      url: "https://coreluma.kr",
      logo: "https://coreluma.kr/images/logo/coreluma-round.svg",
    },
  };

  return (
    <html lang="ko" className={`${dmSerifText.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
