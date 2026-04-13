import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-4">
          {/* Title */}
          <h3 className="mb-0.5 text-base font-bold text-foreground transition-colors group-hover:text-accent sm:text-lg">
            {title}
          </h3>
          <p className="mb-3 min-h-[1.25rem] text-sm text-muted-foreground">
            {vehicle.trim || "\u00A0"}
          </p>

          {/* Specs table */}
          <div className="mb-3 space-y-1 text-xs text-muted-foreground">
            {vehicle.bodyType && (
              <div className="flex justify-between">
                <span>Body Style:</span>
                <span className="font-medium text-foreground">{vehicle.bodyType}</span>
              </div>
            )}
            {vehicle.drivetrainType && (
              <div className="flex justify-between">
                <span>Drivetrain:</span>
                <span className="font-medium text-foreground">{vehicle.drivetrainType}</span>
              </div>
            )}
            {vehicle.engine && (
              <div className="flex justify-between">
                <span>Engine:</span>
                <span className="font-medium text-foreground">{vehicle.engine} L</span>
              </div>
            )}
            {vehicle.transmissionType && (
              <div className="flex justify-between">
                <span>Transmission:</span>
                <span className="font-medium text-foreground">{vehicle.transmissionType}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Mileage:</span>
              <span className="font-medium text-foreground">{numberWithCommas(vehicle.mileage)} km</span>
            </div>
            {vehicle.color && (
              <div className="flex justify-between">
                <span>Exterior Color:</span>
                <span className="font-medium text-foreground">{vehicle.color}</span>
              </div>
            )}
            {vehicle.stockNumber && (
              <div className="flex justify-between">
                <span>Stock Number:</span>
                <span className="font-medium text-foreground">{vehicle.stockNumber}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>VIN Number:</span>
              <span className="font-medium text-foreground text-[10px]">{vehicle.vin}</span>
            </div>
          </div>

          {/* Price + Carfax */}
          <div className="mt-auto flex items-end justify-between border-t border-border/40 pt-3">
            <div>
              <div className="text-xl font-bold text-foreground sm:text-2xl">
                {vehicle.sold
                  ? "SOLD"
                  : !vehicle.floor
                    ? "Coming Soon"
                    : `$${numberWithCommas(vehicle.askingPrice)}`}
              </div>
              {!vehicle.sold && vehicle.floor && (
                <p className="text-[10px] text-muted-foreground">Plus Tax & Fees</p>
              )}
            </div>
            <Image
              src="/images/carfax.png"
              alt="CARFAX"
              width={60}
              height={20}
              className="h-5 w-auto opacity-70"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
