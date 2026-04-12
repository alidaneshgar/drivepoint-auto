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
    <div className="pt-28">
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Inventory
          </h1>
          <p className="mt-2 text-lg opacity-80">
            Browse our quality pre-owned vehicles
          </p>
        </div>
      </section>

      <InventoryContent />
    </div>
  );
}
