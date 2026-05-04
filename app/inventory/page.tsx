import type { Metadata } from "next";
import { Suspense } from "react";
import { InventoryContent } from "@/components/inventory-content";
import { getVehiclesServer } from "@/lib/api/vehicles-server";

export const metadata: Metadata = {
  title: "Used Cars for Sale in Coquitlam, BC | Drive Point Auto",
  description: "Shop our full inventory of quality used cars, trucks, and SUVs in Coquitlam, BC. Filter by make, model, year, and price. Financing available at Drive Point Auto.",
  alternates: { canonical: "/inventory" },
};

export default async function InventoryPage() {
  const vehicles = await getVehiclesServer();

  return (
    <div className="pt-[calc(2.25rem+73px)]">
      <section className="bg-gradient-to-br from-primary to-[oklch(0.40_0.14_240)] py-6 text-primary-foreground sm:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="text-xl font-extrabold tracking-tight sm:text-3xl lg:text-5xl">
            Used Cars for Sale in Coquitlam, BC
          </h1>
          <p className="mt-1 text-sm text-white/70 sm:mt-3 sm:text-lg">
            Browse our quality pre-owned vehicles &mdash; inspected, priced fairly, ready for the road.
          </p>
        </div>
      </section>

      <Suspense>
        <InventoryContent vehicles={vehicles} />
      </Suspense>
    </div>
  );
}
