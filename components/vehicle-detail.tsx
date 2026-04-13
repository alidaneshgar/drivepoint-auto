"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
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
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6">
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: false });

  const onEmblaSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedImage(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onEmblaSelect);
    return () => { emblaApi.off("select", onEmblaSelect); };
  }, [emblaApi, onEmblaSelect]);

  const scrollToImage = useCallback(
    (index: number) => {
      setSelectedImage(index);
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

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

  const similarVehicles = useMemo(() => {
    if (!vehicle) return [];
    return allVehicles
      .filter(
        (v) =>
          v.id !== vehicle.id &&
          v.floor &&
          !v.sold &&
          (v.bodyType === vehicle.bodyType || v.makeName === vehicle.makeName)
      )
      .slice(0, 4);
  }, [vehicle, allVehicles]);

  const currentIndex = useMemo(() => {
    if (!vehicle) return -1;
    return allVehicles.findIndex((v) => v.id === vehicle.id);
  }, [vehicle, allVehicles]);

  const prevVehicle = currentIndex > 0 ? allVehicles[currentIndex - 1] : null;
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
      <div className="flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center px-4">
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

  const specsData = [
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
  ].filter((item) => item.value);

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
            { "@type": "ListItem", position: 1, name: "Home", item: dealership.url },
            { "@type": "ListItem", position: 2, name: "Inventory", item: `${dealership.url}/inventory` },
            { "@type": "ListItem", position: 3, name: title, item: `${dealership.url}/inventory/${canonicalSlug}` },
          ],
        }}
      />

      {/* Modals */}
      <Modal open={showRequestInfo} onClose={() => setShowRequestInfo(false)} title="Request More Info">
        <RequestInfoForm vehicleId={vehicle.id} vehicleTitle={title} onSuccess={() => setTimeout(() => setShowRequestInfo(false), 2000)} />
      </Modal>
      <Modal open={showShare} onClose={() => setShowShare(false)} title="Email to a Friend">
        <ShareVehicleForm vehicleId={vehicle.id} onSuccess={() => setTimeout(() => setShowShare(false), 2000)} />
      </Modal>

      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-[oklch(0.40_0.14_240)] py-4 text-primary-foreground sm:py-6">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-3 flex items-center justify-between">
            <Link
              href="/inventory"
              className="inline-flex items-center text-xs text-white/70 transition-colors hover:text-white sm:text-sm"
            >
              <ArrowLeft className="mr-1 h-3.5 w-3.5" />
              Back to Inventory
            </Link>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {prevVehicle && (
                <Link
                  href={`/inventory/${vehicleSlug(prevVehicle)}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] text-white/70 hover:bg-white/20 hover:text-white sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  <ChevronLeft className="h-3 w-3" />
                  Prev
                </Link>
              )}
              {nextVehicle && (
                <Link
                  href={`/inventory/${vehicleSlug(nextVehicle)}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] text-white/70 hover:bg-white/20 hover:text-white sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  Next
                  <ChevronRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <h1 className="text-lg font-extrabold tracking-tight sm:text-2xl lg:text-3xl">
              {title}
            </h1>
            <div className="flex items-baseline gap-2 sm:text-right">
              <span className="text-xl font-extrabold sm:text-2xl lg:text-3xl">
                {vehicle.sold
                  ? "SOLD"
                  : !vehicle.floor
                    ? "Coming Soon"
                    : `$${numberWithCommas(vehicle.askingPrice)}`}
              </span>
              {!vehicle.sold && vehicle.floor && (
                <span className="text-xs text-white/50">+ tax</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick actions — compact on mobile */}
      <div className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 py-2 sm:gap-2 sm:py-3 md:px-6">
          <Button size="sm" variant="outline" className="shrink-0 rounded-lg text-xs sm:text-sm" onClick={() => setShowRequestInfo(true)}>
            <MessageSquare className="mr-1 h-3.5 w-3.5 sm:mr-1.5 sm:h-4 sm:w-4" />
            Request Info
          </Button>
          <Button size="sm" variant="outline" className="shrink-0 rounded-lg text-xs sm:text-sm" onClick={() => setShowShare(true)}>
            <Share2 className="mr-1 h-3.5 w-3.5 sm:mr-1.5 sm:h-4 sm:w-4" />
            Share
          </Button>
          <Button size="sm" variant="outline" className="shrink-0 rounded-lg text-xs sm:text-sm" asChild>
            <Link href="/contact">
              <Phone className="mr-1 h-3.5 w-3.5 sm:mr-1.5 sm:h-4 sm:w-4" />
              Test Drive
            </Link>
          </Button>
          <Button size="sm" className="shrink-0 rounded-lg bg-accent hover:bg-accent/90 text-xs sm:text-sm" asChild>
            <a href={`tel:${dealership.phone.replace(/[^+\d]/g, "")}`}>
              <Phone className="mr-1 h-3.5 w-3.5 sm:mr-1.5 sm:h-4 sm:w-4" />
              Call Now
            </a>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-10">
          {/* Left — gallery + description */}
          <div className="min-w-0 lg:col-span-2">
            {pics.length > 0 ? (
              <div className="space-y-2 overflow-hidden sm:space-y-3">
                {/* Swipeable image carousel */}
                <div className="relative rounded-xl bg-muted sm:rounded-2xl">
                  <div ref={emblaRef} className="overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="flex">
                      {pics.map((pic, i) => (
                        <div key={i} className="min-w-0 flex-[0_0_100%]">
                          <Image
                            src={pic}
                            alt={`${title} - photo ${i + 1}`}
                            width={1200}
                            height={800}
                            className="w-full h-auto max-h-[50vh] object-contain sm:max-h-none"
                            priority={i === 0}
                            sizes="(max-width: 1024px) 100vw, 66vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {vehicle.websiteBadge && (
                    <Badge className="absolute left-3 top-3 z-10 bg-accent text-xs shadow-md sm:left-4 sm:top-4 sm:text-sm">
                      {vehicle.websiteBadge}
                    </Badge>
                  )}
                  {vehicle.sold && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl sm:rounded-2xl">
                      <span className="rounded-xl bg-white/10 px-6 py-2 text-lg font-bold text-white backdrop-blur-sm sm:px-8 sm:py-3 sm:text-2xl">
                        SOLD
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 z-10 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm sm:bottom-3 sm:right-3 sm:rounded-lg sm:px-2.5 sm:py-1 sm:text-xs">
                    {selectedImage + 1} / {pics.length}
                  </div>
                </div>

                {/* Thumbnails */}
                {pics.length > 1 && (
                  <div className="flex gap-1.5 overflow-x-auto pb-1 sm:gap-2">
                    {pics.map((pic, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToImage(i)}
                        className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md sm:h-16 sm:w-20 lg:h-20 lg:w-24 lg:rounded-lg ${
                          i === selectedImage
                            ? "ring-2 ring-accent ring-offset-1 sm:ring-offset-2"
                            : "opacity-50 hover:opacity-100"
                        } transition-all`}
                      >
                        <Image src={pic} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="80px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-xl bg-muted sm:aspect-[16/10] sm:rounded-2xl">
                <p className="text-muted-foreground">Photos coming soon</p>
              </div>
            )}

            {/* Mobile: key specs inline right after photos */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center lg:hidden">
              <div className="rounded-xl bg-muted/50 p-3">
                <Gauge className="mx-auto mb-1 h-4 w-4 text-accent" />
                <div className="text-xs font-bold">{numberWithCommas(vehicle.mileage)} km</div>
              </div>
              <div className="rounded-xl bg-muted/50 p-3">
                <Settings2 className="mx-auto mb-1 h-4 w-4 text-accent" />
                <div className="text-xs font-bold">{vehicle.transmissionType || "N/A"}</div>
              </div>
              <div className="rounded-xl bg-muted/50 p-3">
                <Fuel className="mx-auto mb-1 h-4 w-4 text-accent" />
                <div className="text-xs font-bold">{vehicle.fuelType || "N/A"}</div>
              </div>
            </div>

            {/* Mobile: CTA buttons right after specs */}
            <div className="mt-4 grid grid-cols-2 gap-2 lg:hidden">
              <Button className="h-11 rounded-xl bg-accent hover:bg-accent/90" onClick={() => setShowRequestInfo(true)}>
                <MessageSquare className="mr-1.5 h-4 w-4" />
                Request Info
              </Button>
              <Button className="h-11 rounded-xl" asChild>
                <a href={`tel:${dealership.phone.replace(/[^+\d]/g, "")}`}>
                  <Phone className="mr-1.5 h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </div>

            {/* Description */}
            {(vehicle.adBodyText || adFeatures.length > 0) && (
              <div className="mt-6 sm:mt-8">
                <h2 className="mb-3 text-lg font-bold sm:text-xl">Vehicle Description</h2>
                {vehicle.adBodyText ? (
                  <div className="space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
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

          {/* Right sidebar — hidden on mobile (key info shown inline above) */}
          <div className="space-y-6">
            {/* Full specs */}
            <div className="rounded-2xl border border-border/60 bg-card p-4 sm:p-6">
              <h2 className="mb-3 text-base font-bold sm:mb-4 sm:text-lg">Vehicle Details</h2>
              <div className="space-y-2 text-sm">
                {specsData.map((item) => (
                  <div key={item.label} className="flex justify-between border-b border-border/40 pb-2 last:border-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden space-y-2.5 lg:block">
              <Button className="w-full bg-accent hover:bg-accent/90 rounded-xl h-11" onClick={() => setShowRequestInfo(true)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Request More Info
              </Button>
              <Button asChild className="w-full rounded-xl h-11">
                <a href={`tel:${dealership.phone.replace(/[^+\d]/g, "")}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call {dealership.phone}
                </a>
              </Button>
            </div>

            {/* Rent */}
            {vehicle.rentable && vehicle.rentPerDay > 0 && (
              <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-4 text-center sm:p-5">
                <p className="mb-1 text-xs font-medium text-muted-foreground sm:text-sm">Available for Rent</p>
                <p className="text-xl font-bold text-accent sm:text-2xl">
                  ${vehicle.rentPerDay}<span className="text-xs font-normal text-muted-foreground sm:text-sm"> / day</span>
                </p>
                <Button className="mt-3 w-full bg-accent hover:bg-accent/90 rounded-xl" onClick={() => setShowRequestInfo(true)}>
                  Inquire About Rental
                </Button>
              </div>
            )}

            <Separator />

            <FinancingCalculator
              defaultPrice={!vehicle.sold && vehicle.floor ? vehicle.askingPrice : undefined}
            />
          </div>
        </div>

        {/* Similar Vehicles */}
        {similarVehicles.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h2 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">Similar Vehicles</h2>
            <div className="grid gap-4 grid-cols-2 sm:gap-6 lg:grid-cols-4">
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
