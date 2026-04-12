import { getVehicles } from "@/lib/api/vehicles";
import { VehicleCard } from "@/components/vehicle-card";

export async function InventoryContent() {
  const vehicles = await getVehicles({});
  const available = vehicles.filter((v) => v.floor && !v.sold);
  const sold = vehicles.filter((v) => v.sold);

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
