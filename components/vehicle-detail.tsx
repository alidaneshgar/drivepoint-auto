"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, Gauge, Fuel, Settings2, Car, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StructuredData } from "@/components/structured-data";
import { dealership } from "@/lib/data/dealership";
import { numberWithCommas, vinFromSlug, vehicleSlug } from "@/lib/utils";
import type { Vehicle } from "@/lib/types/vehicle";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dms.sysandgo.com/api";

export function VehicleDetail({ slug }: { slug: string }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const vin = vinFromSlug(slug);
    fetch(`${API_URL}/vehicles/inventorySearch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data: Vehicle[]) => {
        const found = data.find(
          (v) => v.vin.toUpperCase() === vin.toUpperCase()
        );
        if (found) {
          setVehicle(found);
          // Update page title dynamically
          document.title = `${found.productionYear} ${found.makeName} ${found.modelName} ${found.trim || ""} | ${dealership.name}`.trim();
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-28">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notFound || !vehicle) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
        <h1 className="mb-4 text-2xl font-bold">Vehicle Not Found</h1>
        <p className="mb-6 text-muted-foreground">
          This vehicle may have been sold or removed from our inventory.
        </p>
        <Button asChild>
          <Link href="/inventory">Browse Inventory</Link>
        </Button>
      </div>
    );
  }

  const title = `${vehicle.productionYear} ${vehicle.makeName} ${vehicle.modelName} ${vehicle.trim || ""}`.trim();
  const canonicalSlug = vehicleSlug(vehicle);
  const conditionSchema = (vehicle.condition || "").toLowerCase().includes("new")
    ? "https://schema.org/NewCondition"
    : "https://schema.org/UsedCondition";
  const priceValidUntil = new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10);

  return (
    <div className="pt-28">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Vehicle",
          name: title,
          brand: { "@type": "Brand", name: vehicle.makeName },
          model: vehicle.modelName,
          modelDate: String(vehicle.productionYear),
          vehicleIdentificationNumber: vehicle.vin,
          itemCondition: conditionSchema,
          bodyType: vehicle.bodyType || undefined,
          mileageFromOdometer: { "@type": "QuantitativeValue", value: vehicle.mileage, unitCode: "KMT" },
          color: vehicle.color,
          vehicleTransmission: vehicle.transmissionType,
          driveWheelConfiguration: vehicle.drivetrainType,
          fuelType: vehicle.fuelType,
          numberOfDoors: vehicle.doors,
          vehicleEngine: vehicle.engine ? { "@type": "EngineSpecification", name: `${vehicle.engine}L` } : undefined,
          offers: {
            "@type": "Offer",
            price: vehicle.askingPrice,
            priceCurrency: "CAD",
            priceValidUntil,
            itemCondition: conditionSchema,
            availability: vehicle.sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
            url: `${dealership.url}/inventory/${canonicalSlug}`,
            seller: { "@type": "AutoDealer", name: dealership.name },
          },
          image: vehicle.vehiclePictures?.[0],
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: dealership.url },
            { "@type": "ListItem", position: 2, name: "Inventory", item: `${dealership.url}/inventory` },
            { "@type": "ListItem", position: 3, name: title, item: `${dealership.url}/inventory/${canonicalSlug}` },
          ],
        }}
      />

      {/* Banner */}
      <section className="bg-primary py-8 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Link
            href="/inventory"
            className="mb-4 inline-flex items-center text-sm opacity-80 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Inventory
          </Link>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
              {vehicle.marketingTrim && (
                <p className="mt-1 text-lg opacity-80">{vehicle.marketingTrim}</p>
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                {vehicle.sold
                  ? "SOLD"
                  : !vehicle.floor
                    ? "Coming Soon"
                    : `$${numberWithCommas(vehicle.askingPrice)}`}
              </div>
              {!vehicle.sold && vehicle.floor && (
                <p className="text-sm opacity-70">Plus Taxes &amp; Doc Fee</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Gallery */}
          <div className="lg:col-span-2">
            {vehicle.vehiclePictures && vehicle.vehiclePictures.length > 0 ? (
              <div className="space-y-3">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={vehicle.vehiclePictures[0]}
                    alt={`${title} - main photo`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  {vehicle.websiteBadge && (
                    <Badge className="absolute left-4 top-4 text-sm">{vehicle.websiteBadge}</Badge>
                  )}
                </div>
                {vehicle.vehiclePictures.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
                    {vehicle.vehiclePictures.slice(1, 13).map((pic, i) => (
                      <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={pic}
                          alt={`${title} - photo ${i + 2}`}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center rounded-xl bg-muted">
                <p className="text-muted-foreground">Photos coming soon</p>
              </div>
            )}

            {/* Description */}
            {vehicle.adBodyText && (
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-semibold">Vehicle Description</h2>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  {vehicle.adBodyText.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="rounded-xl border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Vehicle Details</h2>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Body Style", value: vehicle.bodyType },
                  { label: "Engine", value: vehicle.engine ? `${vehicle.engine}L` : "" },
                  { label: "Transmission", value: vehicle.transmissionType },
                  { label: "Drivetrain", value: vehicle.drivetrainType },
                  { label: "Exterior", value: vehicle.color },
                  { label: "Kilometers", value: numberWithCommas(vehicle.mileage) },
                  { label: "Fuel Type", value: vehicle.fuelType },
                  { label: "Doors", value: vehicle.doors?.toString() },
                  { label: "Condition", value: vehicle.condition },
                  { label: "Stock #", value: vehicle.stockNumber },
                  { label: "VIN", value: vehicle.vin },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <Button asChild className="w-full" size="lg">
                <a href={`tel:${dealership.phone.replace(/[^+\d]/g, "")}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call {dealership.phone}
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Inquiry
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
