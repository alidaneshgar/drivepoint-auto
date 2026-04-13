"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useVehicles } from "@/hooks/use-vehicles";
import { numberWithCommas, vehicleSlug } from "@/lib/utils";

export function RecentVehicles() {
  const { vehicles, loading } = useVehicles();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const recent = vehicles
    .filter((v) => v.floor && !v.sold)
    .sort(
      (a, b) =>
        new Date(b.floorDate || 0).getTime() -
        new Date(a.floorDate || 0).getTime()
    )
    .slice(0, 12);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [recent.length]);

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
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-6 flex items-end justify-between sm:mb-8">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">
              Recent Vehicles
            </p>
            <h2 className="text-xl font-bold sm:text-3xl">
              Recently Added
            </h2>
          </div>
          {/* Desktop arrows in header */}
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel with overlaid arrows on mobile */}
        <div className="relative">
          {/* Mobile left arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-1 top-1/3 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md text-foreground sm:hidden"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Mobile right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-1 top-1/3 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md text-foreground sm:hidden"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {/* Scrollable strip */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto pb-2 sm:gap-4 sm:pb-4"
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
                  className="group w-[160px] shrink-0 sm:w-[220px] lg:w-[240px]"
                >
                  <div className="overflow-hidden rounded-lg bg-muted sm:rounded-xl">
                    <Image
                      src={imageUrl}
                      alt={title}
                      width={480}
                      height={320}
                      className="w-full h-auto"
                      sizes="240px"
                    />
                  </div>
                  <div className="mt-2 px-0.5">
                    <h3 className="text-xs font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1 sm:text-sm">
                      {title}
                    </h3>
                    <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs">
                      {numberWithCommas(vehicle.mileage)} km
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-foreground sm:text-sm">
                      ${numberWithCommas(vehicle.askingPrice)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Fade edges to hint at more content */}
          {canScrollRight && (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent sm:w-16" />
          )}
          {canScrollLeft && (
            <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-background to-transparent sm:w-16" />
          )}
        </div>
      </div>
    </section>
  );
}
