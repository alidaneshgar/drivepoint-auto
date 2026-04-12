"use client";

import { useState, useEffect } from "react";
import type { Vehicle } from "@/lib/types/vehicle";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dms.sysandgo.com/api";

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/vehicles/inventorySearch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        return res.json();
      })
      .then((data) => setVehicles(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { vehicles, loading, error };
}

export function useFloorVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/vehicles/inventorySearch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        return res.json();
      })
      .then((data) => setVehicles(data))
      .catch(() => setVehicles([]))
      .finally(() => setLoading(false));
  }, []);

  return { vehicles, loading };
}
