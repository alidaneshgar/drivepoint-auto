import type { Vehicle } from "@/lib/types/vehicle";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dms.sysandgo.com/api";

export async function getVehiclesServer(): Promise<Vehicle[]> {
  try {
    const res = await fetch(`${API_URL}/vehicles/inventorySearch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getVehicleByVinServer(
  vin: string
): Promise<Vehicle | null> {
  const vehicles = await getVehiclesServer();
  return (
    vehicles.find((v) => v.vin.toUpperCase() === vin.toUpperCase()) ?? null
  );
}
