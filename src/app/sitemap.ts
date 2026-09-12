import type { MetadataRoute } from "next";
import { FULL_PAGE_SECTIONS, sectionRoute } from "@/lib/navigation";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    ...FULL_PAGE_SECTIONS.map((section) => ({
      url: `${SITE_URL}${sectionRoute(section)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
