import type { Metadata } from "next";
import { dealership } from "@/lib/data/dealership";
import { VehicleDetail } from "@/components/vehicle-detail";

export const metadata: Metadata = {
  title: "Vehicle Details",
  description: `View vehicle details, photos, specs, and pricing at ${dealership.name} in ${dealership.city}, ${dealership.province}.`,
};

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <VehicleDetail slug={slug} />;
}
