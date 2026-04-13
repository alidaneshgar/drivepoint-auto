"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVehicles } from "@/hooks/use-vehicles";

function SelectField({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <div className="relative flex-1">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-white/15 bg-white/8 pl-4 pr-10 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/12 focus:bg-white/12 focus:outline-none focus:ring-2 focus:ring-accent sm:h-14 sm:text-base"
      >
        <option value="" className="bg-primary text-white">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-primary text-white">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
    </div>
  );
}

export function InventorySearch() {
  const router = useRouter();
  const { vehicles } = useVehicles();
  const available = useMemo(
    () => vehicles.filter((v) => v.floor && !v.sold),
    [vehicles]
  );

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  // Cascading filters: each dropdown only shows options that match the current selections
  const filteredByMake = useMemo(
    () => (make ? available.filter((v) => v.makeName === make) : available),
    [available, make]
  );

  const filteredByMakeAndModel = useMemo(
    () =>
      model ? filteredByMake.filter((v) => v.modelName === model) : filteredByMake,
    [filteredByMake, model]
  );

  const makeOptions = useMemo(
    () =>
      [...new Set(available.map((v) => v.makeName).filter(Boolean))]
        .sort()
        .map((m) => ({
          value: m,
          label: `${m} (${available.filter((v) => v.makeName === m).length})`,
        })),
    [available]
  );

  const modelOptions = useMemo(
    () =>
      [...new Set(filteredByMake.map((v) => v.modelName).filter(Boolean))]
        .sort()
        .map((m) => ({
          value: m,
          label: `${m} (${filteredByMake.filter((v) => v.modelName === m).length})`,
        })),
    [filteredByMake]
  );

  const yearOptions = useMemo(
    () =>
      [...new Set(filteredByMakeAndModel.map((v) => v.productionYear))]
        .sort((a, b) => b - a)
        .map((y) => ({
          value: String(y),
          label: `${y} (${filteredByMakeAndModel.filter((v) => v.productionYear === y).length})`,
        })),
    [filteredByMakeAndModel]
  );

  const matchCount = filteredByMakeAndModel.filter((v) =>
    year ? v.productionYear === parseInt(year) : true
  ).length;

  const handleMakeChange = (val: string) => {
    setMake(val);
    setModel("");
    setYear("");
  };

  const handleModelChange = (val: string) => {
    setModel(val);
    setYear("");
  };

  const handleSearch = () => {
    router.push("/inventory");
  };

  return (
    <section className="bg-gradient-to-b from-primary to-[oklch(0.22_0.03_250)]">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10 md:px-6">
        <div className="mb-5 text-center sm:mb-7">
          <h2 className="text-lg font-bold text-white sm:text-2xl">
            Search Our Inventory
          </h2>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">
            {available.length > 0
              ? `${available.length} vehicles available — find yours`
              : "Browse our selection of quality pre-owned vehicles"}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <SelectField
            value={make}
            onChange={handleMakeChange}
            options={makeOptions}
            placeholder="All Makes"
          />
          <SelectField
            value={model}
            onChange={handleModelChange}
            options={modelOptions}
            placeholder={make ? `All ${make} Models` : "All Models"}
          />
          <SelectField
            value={year}
            onChange={(val) => setYear(val)}
            options={yearOptions}
            placeholder="All Years"
          />
          <Button
            onClick={handleSearch}
            className="h-12 shrink-0 rounded-xl bg-accent px-6 text-sm font-semibold shadow-lg shadow-accent/30 hover:bg-accent/90 transition-all sm:h-14 sm:px-8 sm:text-base"
          >
            <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Search
            {matchCount > 0 && matchCount < available.length && (
              <span className="ml-1.5 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {matchCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
