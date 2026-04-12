import type { Metadata } from "next";
import { pageMetadata } from "@/lib/data/dealership";
import { InventoryContent } from "@/components/inventory-content";

export const metadata: Metadata = {
  title: pageMetadata.inventory.title,
  description: pageMetadata.inventory.description,
  alternates: { canonical: "/inventory" },
};

export default function InventoryPage() {
  return (
    <div className="pt-[calc(2.25rem+73px)]">
      <section className="bg-gradient-to-br from-primary to-[oklch(0.40_0.14_240)] py-14 text-primary-foreground sm:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent-foreground/70">
            Browse &amp; Find
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Our Inventory
          </h1>
          <p className="mt-3 max-w-xl text-lg text-white/70">
            Quality pre-owned vehicles, inspected and priced fairly.
            Find your next car below.
          </p>
        </div>
      </section>

      <InventoryContent />
    </div>
  );
}
