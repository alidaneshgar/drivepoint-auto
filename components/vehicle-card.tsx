import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Gauge, Fuel, Settings2 } from "lucide-react";
import { numberWithCommas, vehicleSlug } from "@/lib/utils";
import type { Vehicle } from "@/lib/types/vehicle";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const slug = vehicleSlug(vehicle);
  const title = `${vehicle.productionYear} ${vehicle.makeName} ${vehicle.modelName}`;
  const imageUrl =
    vehicle.vehiclePictures?.[0] || "/images/car-placeholder.jpg";

  return (
    <Link href={`/inventory/${slug}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1">
        {/* Image */}
        <div className="relative overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={`${title} ${vehicle.trim || ""}`}
            width={800}
            height={600}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Badges */}
          {vehicle.websiteBadge && (
            <Badge className="absolute left-3 top-3 rounded-lg bg-accent shadow-md">
              {vehicle.websiteBadge}
            </Badge>
          )}
          {vehicle.sold && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <span className="rounded-xl bg-white/10 px-6 py-2 text-xl font-bold text-white backdrop-blur-sm">
                SOLD
              </span>
            </div>
          )}
          {!vehicle.sold && !vehicle.floor && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <span className="rounded-xl bg-white/10 px-5 py-2 text-lg font-bold text-white backdrop-blur-sm">
                COMING SOON
              </span>
            </div>
          )}

          {/* Price tag */}
          {!vehicle.sold && vehicle.floor && (
            <div className="absolute bottom-3 right-3 rounded-lg bg-white/95 px-3 py-1.5 text-lg font-bold text-foreground shadow-lg backdrop-blur-sm">
              ${numberWithCommas(vehicle.askingPrice)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-0.5 text-lg font-bold text-foreground transition-colors group-hover:text-accent">
            {title}
          </h3>
          <p className="mb-3 min-h-[1.25rem] text-sm text-muted-foreground">
            {vehicle.trim || "\u00A0"}
          </p>

          {/* Specs pills */}
          <div className="mt-auto flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-md bg-muted/70 px-2 py-1">
              <Gauge className="h-3 w-3" />
              {numberWithCommas(vehicle.mileage)} km
            </span>
            {vehicle.transmissionType && (
              <span className="inline-flex items-center gap-1 rounded-md bg-muted/70 px-2 py-1">
                <Settings2 className="h-3 w-3" />
                {vehicle.transmissionType}
              </span>
            )}
            {vehicle.fuelType && (
              <span className="inline-flex items-center gap-1 rounded-md bg-muted/70 px-2 py-1">
                <Fuel className="h-3 w-3" />
                {vehicle.fuelType}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
