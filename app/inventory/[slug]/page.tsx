import type { Metadata } from "next";
import { dealership } from "@/lib/data/dealership";
import { getVehicleByVinServer } from "@/lib/api/vehicles-server";
import { VehicleDetail } from "@/components/vehicle-detail";
import { numberWithCommas, vinFromSlug, vehicleSlug } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vin = vinFromSlug(slug);
  const vehicle = await getVehicleByVinServer(vin);

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
  const description = `${vehicle.condition || "Used"} ${title} - ${numberWithCommas(vehicle.mileage)} km, ${price}. ${vehicle.transmissionType || ""} ${vehicle.drivetrainType || ""}. Available at ${dealership.name} in ${dealership.city}, ${dealership.province}.`.trim();

  return {
    title: `${title} - ${price} | ${dealership.name}`,
    description,
    alternates: { canonical: `/inventory/${vehicleSlug(vehicle)}` },
    openGraph: {
      title: `${title} - ${price}`,
      description,
      images: vehicle.vehiclePictures?.[0]
        ? [{ url: vehicle.vehiclePictures[0], width: 1200, height: 800 }]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${price}`,
      description,
      images: vehicle.vehiclePictures?.[0] ? [vehicle.vehiclePictures[0]] : [],
    },
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const { slug } = await params;
  return <VehicleDetail slug={slug} />;
}
