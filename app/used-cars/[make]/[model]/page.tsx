import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { dealership } from "@/lib/data/dealership";
import { getVehiclesServer } from "@/lib/api/vehicles-server";
import { VehicleCard } from "@/components/vehicle-card";
import { StructuredData } from "@/components/structured-data";
import { slugify, numberWithCommas } from "@/lib/utils";
import type { Vehicle } from "@/lib/types/vehicle";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ make: string; model: string }> };

async function findModel(
  makeSlug: string,
  modelSlug: string
): Promise<{ makeName: string; modelName: string; vehicles: Vehicle[] } | null> {
  const all = await getVehiclesServer();
  const inStock = all.filter((v) => v.floor && !v.sold);
  const match = inStock.find(
    (v) =>
      slugify(v.makeName) === makeSlug.toLowerCase() &&
      slugify(v.modelName) === modelSlug.toLowerCase()
  );
  if (!match) return null;
  const { makeName, modelName } = match;
  const vehicles = inStock.filter(
    (v) =>
      slugify(v.makeName) === makeSlug.toLowerCase() &&
      slugify(v.modelName) === modelSlug.toLowerCase()
  );
  return { makeName, modelName, vehicles };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { make, model } = await params;
  const found = await findModel(make, model);
  if (!found) {
    return { title: "Not Found", robots: { index: false } };
  }
  const { makeName, modelName, vehicles } = found;
  const years = vehicles.map((v) => v.productionYear).sort();
  const yearRange =
    years.length > 0 && years[0] !== years[years.length - 1]
      ? ` (${years[0]}–${years[years.length - 1]})`
      : years.length > 0
        ? ` ${years[0]}`
        : "";
  const title = `Used ${makeName} ${modelName} for Sale in ${dealership.city}, ${dealership.province}`;
  const description = `${vehicles.length} used ${makeName} ${modelName}${yearRange} for sale at ${dealership.name} in ${dealership.city}. Inspected, financing available, trade-ins welcome.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/used-cars/${slugify(makeName)}/${slugify(modelName)}`,
    },
    openGraph: { title, description, type: "website" },
  };
}

export default async function ModelPage({ params }: Props) {
  const { make, model } = await params;
  const found = await findModel(make, model);
  if (!found) notFound();
  const { makeName, modelName, vehicles } = found;
  const canonical = `${dealership.url}/used-cars/${slugify(makeName)}/${slugify(modelName)}`;

  const prices = vehicles.map((v) => v.askingPrice).filter((p) => p > 0);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const mileages = vehicles.map((v) => v.mileage).filter((m) => m > 0);
  const minMileage = mileages.length ? Math.min(...mileages) : 0;
  const years = vehicles.map((v) => v.productionYear).sort();

  return (
    <div className="pt-[calc(2.25rem+73px)]">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: dealership.url },
            { "@type": "ListItem", position: 2, name: "Inventory", item: `${dealership.url}/inventory` },
            {
              "@type": "ListItem",
              position: 3,
              name: `Used ${makeName}`,
              item: `${dealership.url}/used-cars/${slugify(makeName)}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: `Used ${makeName} ${modelName}`,
              item: canonical,
            },
          ],
        }}
      />

      <section className="bg-gradient-to-br from-primary to-[oklch(0.40_0.14_240)] py-6 text-primary-foreground sm:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <nav className="mb-2 text-xs text-white/60 sm:text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/inventory" className="hover:text-white">Inventory</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/used-cars/${slugify(makeName)}`} className="hover:text-white">
              Used {makeName}
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-white/80">{modelName}</span>
          </nav>
          <h1 className="text-xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Used {makeName} {modelName} for Sale in {dealership.city}, {dealership.province}
          </h1>
          <p className="mt-2 text-sm text-white/70 sm:mt-3 sm:text-base">
            {vehicles.length} {makeName} {modelName} in stock
            {prices.length > 0
              ? ` from $${numberWithCommas(minPrice)}${minPrice !== maxPrice ? ` to $${numberWithCommas(maxPrice)}` : ""}`
              : ""}
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-12">
        <div className="mb-8 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            Searching for a used {makeName} {modelName} for sale in {dealership.city} or the
            surrounding Metro Vancouver area? {dealership.name} currently has {vehicles.length}{" "}
            pre-owned {makeName} {modelName}
            {vehicles.length === 1 ? "" : "s"} in stock
            {years.length > 0
              ? years[0] === years[years.length - 1]
                ? ` from model year ${years[0]}`
                : ` from model years ${years[0]} to ${years[years.length - 1]}`
              : ""}
            {minMileage > 0
              ? `, with mileage starting at ${numberWithCommas(minMileage)} km`
              : ""}
            . Each vehicle is inspected before listing, and we offer in-house financing and
            trade-ins to make the buying process simple.
          </p>
          <p>
            Visit our showroom at {dealership.address}, {dealership.city}, {dealership.province},
            or call {dealership.phone} to book a test drive. We serve customers from
            Coquitlam, Port Moody, Port Coquitlam, Burnaby, New Westminster, Surrey, Maple Ridge,
            and across the Tri-Cities.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {vehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>
    </div>
  );
}
