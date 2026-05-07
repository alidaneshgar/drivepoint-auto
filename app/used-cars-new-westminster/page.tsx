import type { Metadata } from "next";
import { CityLanding } from "@/components/city-landing";
import { getVehiclesServer } from "@/lib/api/vehicles-server";
import { cities } from "@/lib/data/cities";
import { dealership } from "@/lib/data/dealership";

export const dynamic = "force-dynamic";

const city = cities["new-westminster"];

export const metadata: Metadata = {
  title: `Used Cars for Sale Near ${city.name}, BC | ${dealership.name}`,
  description: `Used cars for sale near ${city.name}, BC. ${dealership.name} is just ${city.distanceFromCoquitlam} away across the Brunette Interchange. Honest pricing, financing, trade-ins welcome.`,
  alternates: { canonical: `/used-cars-${city.slug}` },
};

export default async function NewWestminsterPage() {
  const vehicles = await getVehiclesServer();
  return <CityLanding city={city} vehicles={vehicles} />;
}
