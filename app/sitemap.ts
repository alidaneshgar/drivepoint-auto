import type { MetadataRoute } from "next";
import { getVehicles } from "@/lib/api/vehicles";
import { vehicleSlug } from "@/lib/utils";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.drivepointauto.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/inventory`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/financing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  // Add vehicle detail pages
  try {
    const vehicles = await getVehicles({});
    const vehiclePages: MetadataRoute.Sitemap = vehicles
      .filter((v) => v.floor)
      .map((v) => ({
        url: `${BASE_URL}/inventory/${vehicleSlug(v)}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      }));

    return [...staticPages, ...vehiclePages];
  } catch {
    return staticPages;
  }
}
