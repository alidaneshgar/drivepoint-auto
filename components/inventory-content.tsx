"use client";

import { useState, useMemo } from "react";
import { Loader2, Search, SlidersHorizontal, LayoutGrid, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VehicleCard } from "@/components/vehicle-card";
import { useVehicles } from "@/hooks/use-vehicles";

export function InventoryContent() {
  const { vehicles, loading, error } = useVehicles();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "year-desc" | "mileage-asc">("year-desc");
  const [showSold, setShowSold] = useState(false);

  const available = useMemo(() => {
    let filtered = vehicles.filter((v) => v.floor && !v.sold);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.makeName.toLowerCase().includes(q) ||
          v.modelName.toLowerCase().includes(q) ||
          v.productionYear.toString().includes(q) ||
          (v.trim || "").toLowerCase().includes(q) ||
          (v.bodyType || "").toLowerCase().includes(q) ||
          (v.color || "").toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.askingPrice - b.askingPrice);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.askingPrice - a.askingPrice);
        break;
      case "year-desc":
        filtered.sort((a, b) => b.productionYear - a.productionYear);
        break;
      case "mileage-asc":
        filtered.sort((a, b) => a.mileage - b.mileage);
        break;
    }
    return filtered;
  }, [vehicles, search, sortBy]);

  const sold = useMemo(
    () => vehicles.filter((v) => v.sold),
    [vehicles]
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <p className="text-sm text-muted-foreground">Loading inventory...</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="py-24 text-center text-lg text-muted-foreground">
        Unable to load inventory. Please try again later.
      </p>
    );
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Search & filter bar */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by make, model, year, color..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-xl border-0 bg-muted/50 pl-10 text-base"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="h-11 rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="year-desc">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="mileage-asc">Lowest Mileage</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {available.length === 0
              ? "No vehicles match your search"
              : `Showing ${available.length} vehicle${available.length !== 1 ? "s" : ""}`}
            {search && (
              <span>
                {" "}for &ldquo;{search}&rdquo;
              </span>
            )}
          </p>
        </div>

        {/* Vehicle grid */}
        {available.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-semibold">No vehicles found</p>
              <p className="text-muted-foreground">
                {search
                  ? "Try adjusting your search terms."
                  : "Check back soon for new arrivals!"}
              </p>
            </div>
            {search && (
              <Button variant="outline" onClick={() => setSearch("")} className="rounded-xl">
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {available.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}

        {/* Recently sold */}
        {sold.length > 0 && (
          <div className="mt-16">
            <button
              onClick={() => setShowSold(!showSold)}
              className="mb-6 flex items-center gap-2 text-lg font-bold text-muted-foreground transition-colors hover:text-foreground"
            >
              Recently Sold ({sold.length})
              <span className={`text-sm transition-transform ${showSold ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {showSold && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sold.slice(0, 6).map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
