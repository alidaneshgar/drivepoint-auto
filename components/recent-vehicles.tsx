"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useVehicles } from "@/hooks/use-vehicles";
import { numberWithCommas, vehicleSlug } from "@/lib/utils";

export function RecentVehicles() {
  const { vehicles, loading } = useVehicles();
  const scrollRef = useRef<HTMLDivElement>(null);

  const recent = vehicles
    .filter((v) => v.floor && !v.sold)
    .sort(
      (a, b) =>
        new Date(b.floorDate || 0).getTime() -
        new Date(a.floorDate || 0).getTime()
    )
    .slice(0, 12);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  if (recent.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-accent">
              Recent Vehicles
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Recently Added to Our Inventory
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {recent.map((vehicle) => {
            const title = `${vehicle.productionYear} ${vehicle.makeName} ${vehicle.modelName}`;
            const imageUrl =
              vehicle.vehiclePictures?.[0] || "/images/car-placeholder.jpg";
            return (
              <Link
                key={vehicle.id}
                href={`/inventory/${vehicleSlug(vehicle)}`}
                className="group w-[220px] shrink-0 sm:w-[240px]"
              >
                <div className="overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={480}
                    height={320}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="240px"
                  />
                </div>
                <div className="mt-2.5 px-0.5">
                  <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                    {title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {numberWithCommas(vehicle.mileage)} km
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-foreground">
                    ${numberWithCommas(vehicle.askingPrice)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
