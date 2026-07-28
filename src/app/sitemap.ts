import type { MetadataRoute } from "next";

const baseUrl = "https://coreluma.kr";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/concepts/image-hero`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
