import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dealership } from "@/lib/data/dealership";
import { getVehiclesServer } from "@/lib/api/vehicles-server";
import { VehicleDetail } from "@/components/vehicle-detail";
import { numberWithCommas, vinFromSlug, vehicleSlug } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vin = vinFromSlug(slug);
  const vehicles = await getVehiclesServer();
  const vehicle = vehicles.find((v) => v.vin.toUpperCase() === vin.toUpperCase());

  if (!vehicle) {
    return {
      title: "Vehicle Not Found",
      description: `This vehicle may no longer be available at ${dealership.name}.`,
    };
  }

  const title = `${vehicle.productionYear} ${vehicle.makeName} ${vehicle.modelName} ${vehicle.trim || ""}`.trim();
  const price = vehicle.sold
    ? "SOLD"
    : `$${numberWithCommas(vehicle.askingPrice)}`;
  const description = `${vehicle.condition || "Used"} ${title} for sale in ${dealership.city}, ${dealership.province} — ${numberWithCommas(vehicle.mileage)} km, ${price}. ${vehicle.transmissionType || ""} ${vehicle.drivetrainType || ""}. Available now at ${dealership.name}.`.trim();
  const seoTitle = `${title} for Sale in ${dealership.city}, ${dealership.province} - ${price}`;

  return {
    title: seoTitle,
    description,
    alternates: { canonical: `/inventory/${vehicleSlug(vehicle)}` },
    openGraph: {
      title: seoTitle,
      description,
      images: vehicle.vehiclePictures?.[0]
        ? [{ url: vehicle.vehiclePictures[0], width: 1200, height: 800 }]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description,
      images: vehicle.vehiclePictures?.[0] ? [vehicle.vehiclePictures[0]] : [],
    },
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const { slug } = await params;
  const vin = vinFromSlug(slug);
  const allVehicles = await getVehiclesServer();
  const vehicle = allVehicles.find((v) => v.vin.toUpperCase() === vin.toUpperCase());

  if (!vehicle) notFound();

  return <VehicleDetail vehicle={vehicle} allVehicles={allVehicles} />;
}
