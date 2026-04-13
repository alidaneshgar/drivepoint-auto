"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVehicles } from "@/hooks/use-vehicles";

export function InventorySearch() {
  const router = useRouter();
  const { vehicles } = useVehicles();
  const available = vehicles.filter((v) => v.floor && !v.sold);

  const uniqueMakes = [...new Set(available.map((v) => v.makeName).filter(Boolean))].sort();
  const uniqueBodies = [...new Set(available.map((v) => v.bodyType).filter(Boolean))].sort();
  const uniqueYears = [...new Set(available.map((v) => v.productionYear))].sort((a, b) => b - a);

  const [make, setMake] = useState("");
  const [body, setBody] = useState("");
  const [year, setYear] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (body) params.set("body", body);
    if (year) params.set("year", year);
    router.push(`/inventory${params.toString() ? `?${params}` : ""}`);
  };

  const selectClass =
    "h-12 w-full rounded-xl border-0 bg-white/10 px-4 text-sm text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent sm:h-14 sm:text-base appearance-none";

  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10 md:px-6">
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="text-lg font-bold text-white sm:text-2xl">
            Search Our Inventory
          </h2>
          <p className="mt-1 text-xs text-white/60 sm:text-sm">
            {available.length > 0
              ? `${available.length} vehicles available`
              : "Browse our selection"}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className={selectClass}
          >
            <option value="" className="text-foreground">All Makes</option>
            {uniqueMakes.map((m) => (
              <option key={m} value={m} className="text-foreground">{m}</option>
            ))}
          </select>
          <select
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={selectClass}
          >
            <option value="" className="text-foreground">All Body Styles</option>
            {uniqueBodies.map((b) => (
              <option key={b} value={b} className="text-foreground">{b}</option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={selectClass}
          >
            <option value="" className="text-foreground">All Years</option>
            {uniqueYears.map((y) => (
              <option key={y} value={y} className="text-foreground">{y}</option>
            ))}
          </select>
          <Button
            onClick={handleSearch}
            className="h-12 rounded-xl bg-accent px-8 text-sm font-semibold shadow-lg shadow-accent/30 hover:bg-accent/90 sm:h-14 sm:text-base"
          >
            <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Search
          </Button>
        </div>
      </div>
    </section>
  );
}
