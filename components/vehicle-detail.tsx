"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  Gauge,
  Fuel,
  Settings2,
  Car,
  Loader2,
  Share2,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StructuredData } from "@/components/structured-data";
import { RequestInfoForm } from "@/components/request-info-form";
import { ShareVehicleForm } from "@/components/share-vehicle-form";
import { FinancingCalculator } from "@/components/financing-calculator";
import { VehicleCard } from "@/components/vehicle-card";
import { dealership } from "@/lib/data/dealership";
import { numberWithCommas, vinFromSlug, vehicleSlug } from "@/lib/utils";
import type { Vehicle } from "@/lib/types/vehicle";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dms.sysandgo.com/api";

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function parseAdSettings(
  adSettings: Record<string, unknown> | undefined
): string[] {
  if (!adSettings) return [];
  const items: string[] = [];
  for (const section of Object.values(adSettings)) {
    if (!Array.isArray(section)) continue;
    for (const group of section) {
      if (
        typeof group === "object" &&
        group !== null &&
        "checked" in group &&
        group.checked &&
        "items" in group &&
        Array.isArray(group.items)
      ) {
        for (const item of group.items) {
          if (
            typeof item === "object" &&
            item !== null &&
            "checked" in item &&
            item.checked &&
            "text" in item
          ) {
            items.push(String(item.text));
          }
        }
      }
    }
  }
  return items;
}

export function VehicleDetail({ slug }: { slug: string }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showRequestInfo, setShowRequestInfo] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const vin = vinFromSlug(slug);
    fetch(`${API_URL}/vehicles/inventorySearch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data: Vehicle[]) => {
        setAllVehicles(data);
        const found = data.find(
          (v) => v.vin.toUpperCase() === vin.toUpperCase()
        );
        if (found) {
          setVehicle(found);
          document.title = `${found.productionYear} ${found.makeName} ${found.modelName} ${found.trim || ""} | ${dealership.name}`.trim();
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Similar vehicles — same body type, different vehicle
  const similarVehicles = useMemo(() => {
    if (!vehicle) return [];
    return allVehicles
      .filter(
        (v) =>
          v.id !== vehicle.id &&
          v.floor &&
          !v.sold &&
          (v.bodyType === vehicle.bodyType ||
            v.makeName === vehicle.makeName)
      )
      .slice(0, 4);
  }, [vehicle, allVehicles]);

  // Previous/Next vehicle in inventory
  const currentIndex = useMemo(() => {
    if (!vehicle) return -1;
    return allVehicles.findIndex((v) => v.id === vehicle.id);
  }, [vehicle, allVehicles]);

  const prevVehicle =
    currentIndex > 0 ? allVehicles[currentIndex - 1] : null;
  const nextVehicle =
    currentIndex >= 0 && currentIndex < allVehicles.length - 1
      ? allVehicles[currentIndex + 1]
      : null;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-28">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
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

  const title =
    `${vehicle.productionYear} ${vehicle.makeName} ${vehicle.modelName} ${vehicle.trim || ""}`.trim();
  const canonicalSlug = vehicleSlug(vehicle);
  const conditionSchema = (vehicle.condition || "")
    .toLowerCase()
    .includes("new")
    ? "https://schema.org/NewCondition"
    : "https://schema.org/UsedCondition";
  const priceValidUntil = new Date(Date.now() + 90 * 86400000)
    .toISOString()
    .slice(0, 10);
  const adFeatures = parseAdSettings(vehicle.adSettings);
  const pics = vehicle.vehiclePictures || [];

  return (
    <div className="pt-[calc(2.25rem+73px)]">
      {/* Schema.org */}
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
          mileageFromOdometer: {
            "@type": "QuantitativeValue",
            value: vehicle.mileage,
            unitCode: "KMT",
          },
          color: vehicle.color,
          vehicleTransmission: vehicle.transmissionType,
          driveWheelConfiguration: vehicle.drivetrainType,
          fuelType: vehicle.fuelType,
          numberOfDoors: vehicle.doors,
          vehicleEngine: vehicle.engine
            ? { "@type": "EngineSpecification", name: `${vehicle.engine}L` }
            : undefined,
          offers: {
            "@type": "Offer",
            price: vehicle.askingPrice,
            priceCurrency: "CAD",
            priceValidUntil,
            itemCondition: conditionSchema,
            availability: vehicle.sold
              ? "https://schema.org/SoldOut"
              : "https://schema.org/InStock",
            url: `${dealership.url}/inventory/${canonicalSlug}`,
            seller: { "@type": "AutoDealer", name: dealership.name },
          },
          image: pics[0],
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: dealership.url,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Inventory",
              item: `${dealership.url}/inventory`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: title,
              item: `${dealership.url}/inventory/${canonicalSlug}`,
            },
          ],
        }}
      />

      {/* Modals */}
      <Modal
        open={showRequestInfo}
        onClose={() => setShowRequestInfo(false)}
        title="Request More Info"
      >
        <RequestInfoForm
          vehicleId={vehicle.id}
          onSuccess={() =>
            setTimeout(() => setShowRequestInfo(false), 2000)
          }
        />
      </Modal>
      <Modal
        open={showShare}
        onClose={() => setShowShare(false)}
        title="Email to a Friend"
      >
        <ShareVehicleForm
          vehicleId={vehicle.id}
          onSuccess={() => setTimeout(() => setShowShare(false), 2000)}
        />
      </Modal>

      {/* Header bar */}
      <section className="bg-gradient-to-br from-primary to-[oklch(0.40_0.14_240)] py-6 text-primary-foreground sm:py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-4 flex items-center justify-between">
            <Link
              href="/inventory"
              className="inline-flex items-center text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Inventory
            </Link>
            {/* Prev/Next nav */}
            <div className="flex items-center gap-2">
              {prevVehicle && (
                <Link
                  href={`/inventory/${vehicleSlug(prevVehicle)}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <ChevronLeft className="h-3 w-3" />
                  Previous
                </Link>
              )}
              {nextVehicle && (
                <Link
                  href={`/inventory/${vehicleSlug(nextVehicle)}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                >
                  Next
                  <ChevronRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                {title}
              </h1>
              {vehicle.marketingTrim && (
                <p className="mt-1 text-base text-white/70">
                  {vehicle.marketingTrim}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-2xl font-extrabold sm:text-3xl">
                {vehicle.sold
                  ? "SOLD"
                  : !vehicle.floor
                    ? "Coming Soon"
                    : `$${numberWithCommas(vehicle.askingPrice)}`}
              </div>
              {!vehicle.sold && vehicle.floor && (
                <p className="text-sm text-white/60">Plus Taxes & Doc Fee</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Action bar */}
      <div className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 md:px-6">
          <Button
            size="sm"
            variant="outline"
            className="shrink-0 rounded-lg"
            onClick={() => setShowRequestInfo(true)}
          >
            <MessageSquare className="mr-1.5 h-4 w-4" />
            Request More Info
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="shrink-0 rounded-lg"
            onClick={() => setShowShare(true)}
          >
            <Share2 className="mr-1.5 h-4 w-4" />
            Email to a Friend
          </Button>
          <Button size="sm" variant="outline" className="shrink-0 rounded-lg" asChild>
            <Link href="/contact">
              <Phone className="mr-1.5 h-4 w-4" />
              Schedule Test Drive
            </Link>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Left — gallery + description */}
          <div className="lg:col-span-2">
            {/* Main image */}
            {pics.length > 0 ? (
              <div className="space-y-3">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={pics[selectedImage]}
                    alt={`${title} - photo ${selectedImage + 1}`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  {vehicle.websiteBadge && (
                    <Badge className="absolute left-4 top-4 bg-accent text-sm shadow-md">
                      {vehicle.websiteBadge}
                    </Badge>
                  )}
                  {vehicle.sold && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                      <span className="rounded-xl bg-white/10 px-8 py-3 text-2xl font-bold text-white backdrop-blur-sm">
                        SOLD
                      </span>
                    </div>
                  )}
                  {/* Image counter */}
                  <div className="absolute bottom-3 right-3 rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {selectedImage + 1} / {pics.length}
                  </div>
                </div>

                {/* Thumbnails */}
                {pics.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {pics.map((pic, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-24 ${
                          i === selectedImage
                            ? "ring-2 ring-accent ring-offset-2"
                            : "opacity-60 hover:opacity-100"
                        } transition-all`}
                      >
                        <Image
                          src={pic}
                          alt={`${title} thumbnail ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-muted">
                <p className="text-muted-foreground">Photos coming soon</p>
              </div>
            )}

            {/* Vehicle description / ad body */}
            {(vehicle.adBodyText || adFeatures.length > 0) && (
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">Vehicle Description</h2>
                {vehicle.adBodyText ? (
                  <div className="space-y-2 leading-relaxed text-muted-foreground">
                    {vehicle.adBodyText.split("\n").map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                ) : (
                  <ul className="grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                    {adFeatures.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Specs card */}
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h2 className="mb-4 text-lg font-bold">Vehicle Details</h2>
              <div className="space-y-2.5 text-sm">
                {[
                  { label: "Body Style", value: vehicle.bodyType },
                  {
                    label: "Engine",
                    value: vehicle.engine ? `${vehicle.engine}L` : "",
                  },
                  { label: "Transmission", value: vehicle.transmissionType },
                  { label: "Drivetrain", value: vehicle.drivetrainType },
                  { label: "Exterior", value: vehicle.color },
                  {
                    label: "Kilometers",
                    value: numberWithCommas(vehicle.mileage),
                    icon: Gauge,
                  },
                  { label: "Fuel Type", value: vehicle.fuelType, icon: Fuel },
                  { label: "Doors", value: vehicle.doors?.toString() },
                  { label: "Condition", value: vehicle.condition },
                  { label: "Stock #", value: vehicle.stockNumber },
                  { label: "VIN", value: vehicle.vin },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between border-b border-border/40 pb-2 last:border-0"
                    >
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="font-medium text-foreground">
                        {item.value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="space-y-2.5">
              <Button
                className="w-full bg-accent hover:bg-accent/90 rounded-xl h-11"
                onClick={() => setShowRequestInfo(true)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Request More Info
              </Button>
              <Button asChild className="w-full rounded-xl h-11">
                <a
                  href={`tel:${dealership.phone.replace(/[^+\d]/g, "")}`}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call {dealership.phone}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl h-11"
              >
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Inquiry
                </Link>
              </Button>
            </div>

            {/* Rent button — only if rentable */}
            {vehicle.rentable && vehicle.rentPerDay > 0 && (
              <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-5 text-center">
                <p className="mb-1 text-sm font-medium text-muted-foreground">
                  Available for Rent
                </p>
                <p className="text-2xl font-bold text-accent">
                  ${vehicle.rentPerDay}
                  <span className="text-sm font-normal text-muted-foreground">
                    {" "}
                    / day
                  </span>
                </p>
                <Button
                  className="mt-3 w-full bg-accent hover:bg-accent/90 rounded-xl"
                  onClick={() => setShowRequestInfo(true)}
                >
                  Inquire About Rental
                </Button>
              </div>
            )}

            <Separator />

            {/* Financing calculator */}
            <FinancingCalculator
              defaultPrice={
                !vehicle.sold && vehicle.floor
                  ? vehicle.askingPrice
                  : undefined
              }
            />
          </div>
        </div>

        {/* Similar Vehicles */}
        {similarVehicles.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">Similar Vehicles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {similarVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
