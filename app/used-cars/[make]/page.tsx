import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { dealership } from "@/lib/data/dealership";
import { getVehiclesServer } from "@/lib/api/vehicles-server";
import { VehicleCard } from "@/components/vehicle-card";
import { StructuredData } from "@/components/structured-data";
import { slugify } from "@/lib/utils";
import type { Vehicle } from "@/lib/types/vehicle";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ make: string }> };

async function findMake(makeSlug: string): Promise<{
  makeName: string;
  vehicles: Vehicle[];
} | null> {
  const all = await getVehiclesServer();
  const inStock = all.filter((v) => v.floor && !v.sold);
  const match = inStock.find(
    (v) => slugify(v.makeName) === makeSlug.toLowerCase()
  );
  if (!match) return null;
  const makeName = match.makeName;
  const vehicles = inStock.filter(
    (v) => slugify(v.makeName) === makeSlug.toLowerCase()
  );
  return { makeName, vehicles };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { make } = await params;
  const found = await findMake(make);
  if (!found) {
    return { title: "Not Found", robots: { index: false } };
  }
  const { makeName, vehicles } = found;
  const title = `Used ${makeName} for Sale in ${dealership.city}, ${dealership.province}`;
  const description = `Browse ${vehicles.length} used ${makeName} vehicle${vehicles.length === 1 ? "" : "s"} for sale at ${dealership.name} in ${dealership.city}, ${dealership.province}. Inspected, fairly priced, financing available.`;
  return {
    title,
    description,
    alternates: { canonical: `/used-cars/${slugify(makeName)}` },
    openGraph: { title, description, type: "website" },
  };
}

export default async function MakePage({ params }: Props) {
  const { make } = await params;
  const found = await findMake(make);
  if (!found) notFound();
  const { makeName, vehicles } = found;
  const canonical = `${dealership.url}/used-cars/${slugify(makeName)}`;

  const models = Array.from(
    new Set(vehicles.map((v) => v.modelName).filter(Boolean))
  ).sort();

  return (
    <div className="pt-[calc(2.25rem+73px)]">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: dealership.url },
            { "@type": "ListItem", position: 2, name: "Inventory", item: `${dealership.url}/inventory` },
            { "@type": "ListItem", position: 3, name: `Used ${makeName}`, item: canonical },
          ],
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Used ${makeName} for Sale in ${dealership.city}, ${dealership.province}`,
          numberOfItems: vehicles.length,
          itemListElement: vehicles.slice(0, 20).map((v, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${dealership.url}/inventory/${[v.productionYear, v.makeName, v.modelName, v.trim].filter(Boolean).join("-").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${v.vin}`,
            name: `${v.productionYear} ${v.makeName} ${v.modelName} ${v.trim || ""}`.trim(),
          })),
        }}
      />

      <section className="bg-gradient-to-br from-primary to-[oklch(0.40_0.14_240)] py-6 text-primary-foreground sm:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <nav className="mb-2 text-xs text-white/60 sm:text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/inventory" className="hover:text-white">Inventory</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white/80">Used {makeName}</span>
          </nav>
          <h1 className="text-xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Used {makeName} for Sale in {dealership.city}, {dealership.province}
          </h1>
          <p className="mt-2 text-sm text-white/70 sm:mt-3 sm:text-base">
            {vehicles.length} pre-owned {makeName} vehicle{vehicles.length === 1 ? "" : "s"} in stock at {dealership.name}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-12">
        <div className="mb-8 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            Looking for a used {makeName} in {dealership.city} or the surrounding Tri-Cities and Metro
            Vancouver area? {dealership.name} stocks quality pre-owned {makeName} vehicles, each one
            inspected and priced honestly. Whether you&apos;re commuting from Port Moody, Burnaby, or
            New Westminster, we&apos;re a short drive away at {dealership.address}, {dealership.city}.
          </p>
          {models.length > 0 && (
            <p>
              Currently in stock:{" "}
              {models.map((m, i) => (
                <span key={m}>
                  <Link
                    href={`/used-cars/${slugify(makeName)}/${slugify(m)}`}
                    className="font-medium text-accent underline-offset-2 hover:underline"
                  >
                    {makeName} {m}
                  </Link>
                  {i < models.length - 1 ? ", " : ""}
                </span>
              ))}
              .
            </p>
          )}
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
