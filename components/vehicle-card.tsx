import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { numberWithCommas, vehicleSlug } from "@/lib/utils";
import type { Vehicle } from "@/lib/types/vehicle";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const slug = vehicleSlug(vehicle);
  const title = `${vehicle.productionYear} ${vehicle.makeName} ${vehicle.modelName}`;
  const imageUrl =
    vehicle.vehiclePictures?.[0] || "/images/car-placeholder.jpg";

  return (
    <Link href={`/inventory/${slug}`} className="group block">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={`${title} ${vehicle.trim || ""}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {vehicle.websiteBadge && (
            <Badge className="absolute left-3 top-3">{vehicle.websiteBadge}</Badge>
          )}
          {vehicle.sold && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-2xl font-bold text-white">SOLD</span>
            </div>
          )}
          {!vehicle.sold && !vehicle.floor && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-xl font-bold text-white">COMING SOON</span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="mb-1 text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
            {title}
          </h3>
          {vehicle.trim && (
            <p className="mb-2 text-sm text-muted-foreground">{vehicle.trim}</p>
          )}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {numberWithCommas(vehicle.mileage)} km
            </div>
            <div className="text-lg font-bold text-foreground">
              {vehicle.sold
                ? "SOLD"
                : !vehicle.floor
                  ? "Coming Soon"
                  : `$${numberWithCommas(vehicle.askingPrice)}`}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
