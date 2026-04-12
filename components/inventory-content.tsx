"use client";

import { useState, useMemo } from "react";
import { Loader2, Search, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VehicleCard } from "@/components/vehicle-card";
import { useVehicles } from "@/hooks/use-vehicles";

const mileageOptions = [
  { label: "< 10,000 km", value: 10000 },
  { label: "< 20,000 km", value: 20000 },
  { label: "< 40,000 km", value: 40000 },
  { label: "< 60,000 km", value: 60000 },
  { label: "< 80,000 km", value: 80000 },
  { label: "< 100,000 km", value: 100000 },
  { label: "< 120,000 km", value: 120000 },
  { label: "< 150,000 km", value: 150000 },
  { label: "< 200,000 km", value: 200000 },
];

const priceOptions = [
  { label: "< $5,000", value: 5000 },
  { label: "< $10,000", value: 10000 },
  { label: "< $15,000", value: 15000 },
  { label: "< $20,000", value: 20000 },
  { label: "< $25,000", value: 25000 },
  { label: "< $30,000", value: 30000 },
  { label: "< $35,000", value: 35000 },
  { label: "< $40,000", value: 40000 },
  { label: "< $45,000", value: 45000 },
  { label: "< $50,000", value: 50000 },
];

type SortKey =
  | "recently-arrived"
  | "make-asc"
  | "make-desc"
  | "price-asc"
  | "price-desc"
  | "year-asc"
  | "year-desc"
  | "mileage-asc"
  | "mileage-desc";

const selectClass =
  "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

export function InventoryContent() {
  const { vehicles, loading, error } = useVehicles();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("recently-arrived");
  const [filterYear, setFilterYear] = useState("");
  const [filterMake, setFilterMake] = useState("");
  const [filterBody, setFilterBody] = useState("");
  const [filterMileage, setFilterMileage] = useState("");
  const [filterTransmission, setFilterTransmission] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [hideSold, setHideSold] = useState(true);

  // Derive unique values for filter dropdowns
  const uniqueYears = useMemo(
    () =>
      [...new Set(vehicles.map((v) => v.productionYear))]
        .sort((a, b) => b - a),
    [vehicles]
  );
  const uniqueMakes = useMemo(
    () =>
      [...new Set(vehicles.map((v) => v.makeName).filter(Boolean))].sort(),
    [vehicles]
  );
  const uniqueBodies = useMemo(
    () =>
      [...new Set(vehicles.map((v) => v.bodyType).filter(Boolean))].sort(),
    [vehicles]
  );
  const uniqueTransmissions = useMemo(
    () =>
      [
        ...new Set(vehicles.map((v) => v.transmissionType).filter(Boolean)),
      ].sort(),
    [vehicles]
  );

  const hasActiveFilters =
    search ||
    filterYear ||
    filterMake ||
    filterBody ||
    filterMileage ||
    filterTransmission ||
    filterPrice;

  const clearFilters = () => {
    setSearch("");
    setFilterYear("");
    setFilterMake("");
    setFilterBody("");
    setFilterMileage("");
    setFilterTransmission("");
    setFilterPrice("");
  };

  const filtered = useMemo(() => {
    let result = vehicles.filter((v) => {
      if (hideSold && v.sold) return false;
      if (!v.floor && !v.sold) return false; // hide non-floor, non-sold
      if (filterYear && v.productionYear !== parseInt(filterYear)) return false;
      if (filterMake && v.makeName !== filterMake) return false;
      if (filterBody && v.bodyType !== filterBody) return false;
      if (filterTransmission && v.transmissionType !== filterTransmission)
        return false;
      if (filterMileage && v.mileage > parseInt(filterMileage)) return false;
      if (filterPrice && v.askingPrice > parseInt(filterPrice)) return false;
      if (search) {
        const q = search.toLowerCase();
        const haystack =
          `${v.makeName} ${v.modelName} ${v.productionYear} ${v.trim || ""} ${v.bodyType || ""} ${v.color || ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    // Sort
    switch (sortBy) {
      case "make-asc":
        result.sort((a, b) => a.makeName.localeCompare(b.makeName));
        break;
      case "make-desc":
        result.sort((a, b) => b.makeName.localeCompare(a.makeName));
        break;
      case "price-asc":
        result.sort((a, b) => a.askingPrice - b.askingPrice);
        break;
      case "price-desc":
        result.sort((a, b) => b.askingPrice - a.askingPrice);
        break;
      case "year-asc":
        result.sort((a, b) => a.productionYear - b.productionYear);
        break;
      case "year-desc":
        result.sort((a, b) => b.productionYear - a.productionYear);
        break;
      case "mileage-asc":
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case "mileage-desc":
        result.sort((a, b) => b.mileage - a.mileage);
        break;
      case "recently-arrived":
      default:
        // floorDate descending (newest first)
        result.sort(
          (a, b) =>
            new Date(b.floorDate || 0).getTime() -
            new Date(a.floorDate || 0).getTime()
        );
        break;
    }

    return result;
  }, [
    vehicles,
    search,
    sortBy,
    filterYear,
    filterMake,
    filterBody,
    filterMileage,
    filterTransmission,
    filterPrice,
    hideSold,
  ]);

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
    <section className="py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Search bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by make, model, year, color..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-xl border-border bg-card pl-10 text-base"
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
        </div>

        {/* Filter dropdowns */}
        <div className="mb-4 rounded-xl border border-border/60 bg-card p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className={selectClass}
            >
              <option value="">All Years</option>
              {uniqueYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <select
              value={filterMake}
              onChange={(e) => setFilterMake(e.target.value)}
              className={selectClass}
            >
              <option value="">All Makes</option>
              {uniqueMakes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={filterBody}
              onChange={(e) => setFilterBody(e.target.value)}
              className={selectClass}
            >
              <option value="">All Body Styles</option>
              {uniqueBodies.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              value={filterMileage}
              onChange={(e) => setFilterMileage(e.target.value)}
              className={selectClass}
            >
              <option value="">All Mileage</option>
              {mileageOptions.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>

            <select
              value={filterTransmission}
              onChange={(e) => setFilterTransmission(e.target.value)}
              className={selectClass}
            >
              <option value="">All Transmissions</option>
              {uniqueTransmissions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className={selectClass}
            >
              <option value="">All Prices</option>
              {priceOptions.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort + sold toggle + clear */}
          <div className="mt-3 flex flex-col items-start justify-between gap-3 border-t border-border/40 pt-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className={`${selectClass} w-auto`}
              >
                <option value="recently-arrived">Recently Arrived</option>
                <option value="make-asc">Make A → Z</option>
                <option value="make-desc">Make Z → A</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Year: Newest</option>
                <option value="year-asc">Year: Oldest</option>
                <option value="mileage-asc">Mileage: Lowest</option>
                <option value="mileage-desc">Mileage: Highest</option>
              </select>

              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={!hideSold}
                  onChange={(e) => setHideSold(!e.target.checked)}
                  className="rounded border-border"
                />
                Show Sold
              </label>
            </div>

            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground"
                >
                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                  Clear Filters
                </Button>
              )}
              <span className="text-sm font-medium text-muted-foreground">
                {filtered.length} vehicle{filtered.length !== 1 && "s"}
              </span>
            </div>
          </div>
        </div>

        {/* Vehicle grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-semibold">No vehicles found</p>
              <p className="text-muted-foreground">
                {hasActiveFilters
                  ? "Try adjusting your filters."
                  : "Check back soon for new arrivals!"}
              </p>
            </div>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="rounded-xl"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
