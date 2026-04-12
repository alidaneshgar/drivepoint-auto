import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberWithCommas(x: number | string | undefined): string {
  if (x === undefined || x === null) return "";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function vehicleSlug(vehicle: {
  productionYear: number;
  makeName: string;
  modelName: string;
  trim?: string;
  vin: string;
}): string {
  const parts = [
    vehicle.productionYear,
    vehicle.makeName,
    vehicle.modelName,
    vehicle.trim,
  ]
    .filter(Boolean)
    .map(String);
  return `${slugify(parts.join(" "))}-${vehicle.vin}`;
}

export function vinFromSlug(slug: string): string {
  // VIN is always the last segment after the final dash,
  // and is 17 characters
  const parts = slug.split("-");
  // Try to find a 17-char VIN at the end
  const lastPart = parts[parts.length - 1];
  if (lastPart && lastPart.length === 17) return lastPart;
  // Fallback: use everything after the last known separator
  return slug;
}
