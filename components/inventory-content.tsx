"use client";

import { Loader2 } from "lucide-react";
import { VehicleCard } from "@/components/vehicle-card";
import { useVehicles } from "@/hooks/use-vehicles";

export function InventoryContent() {
  const { vehicles, loading, error } = useVehicles();
  const available = vehicles.filter((v) => v.floor && !v.sold);
  const sold = vehicles.filter((v) => v.sold);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="py-20 text-center text-lg text-muted-foreground">
        Unable to load inventory. Please try again later.
      </p>
    );
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {available.length === 0 ? (
          <p className="py-20 text-center text-lg text-muted-foreground">
            No vehicles currently available. Check back soon!
          </p>
        ) : (
          <>
            <p className="mb-8 text-sm text-muted-foreground">
              Showing {available.length} vehicle{available.length !== 1 && "s"}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {available.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </>
        )}

        {sold.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-muted-foreground">
              Recently Sold
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sold.slice(0, 6).map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
