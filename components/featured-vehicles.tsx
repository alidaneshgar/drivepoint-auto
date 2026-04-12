"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/vehicle-card";
import { useFloorVehicles } from "@/hooks/use-vehicles";

export function FeaturedVehicles() {
  const { vehicles, loading } = useFloorVehicles();
  const featured = vehicles.filter((v) => !v.sold && v.floor).slice(0, 6);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Vehicles
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Browse our hand-picked selection of quality pre-owned vehicles.
            Every car is inspected, priced fairly, and ready for you.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : featured.length === 0 ? null : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button asChild size="lg" variant="outline">
                <Link href="/inventory">
                  View All Inventory
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
