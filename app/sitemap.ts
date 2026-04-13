import type { MetadataRoute } from "next";
import { vehicleSlug } from "@/lib/utils";
import type { Vehicle } from "@/lib/types/vehicle";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dms.sysandgo.com/api";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.drivepointauto.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/inventory`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/financing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/credit-application`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const res = await fetch(`${API_URL}/vehicles/inventorySearch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (!res.ok) return staticPages;
    const vehicles: Vehicle[] = await res.json();
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
