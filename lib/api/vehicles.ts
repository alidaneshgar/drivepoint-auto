import type { Vehicle } from "@/lib/types/vehicle";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dms.sysandgo.com/api";

export async function getVehicles(
  searchObject: Record<string, unknown> = {}
): Promise<Vehicle[]> {
  const res = await fetch(`${API_URL}/vehicles/inventorySearch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(searchObject),
    next: { revalidate: 300 }, // ISR: revalidate every 5 minutes
  });

  if (!res.ok) {
    console.error("Failed to fetch vehicles:", res.status);
    return [];
  }

  return res.json();
}

export async function getFloorVehicles(): Promise<Vehicle[]> {
  const res = await fetch(`${API_URL}/vehicles/withFirstPicture/floor`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    console.error("Failed to fetch floor vehicles:", res.status);
    return [];
  }

  return res.json();
}

export async function getVehicleByVin(vin: string): Promise<Vehicle | null> {
  const vehicles = await getVehicles({});
  return vehicles.find((v) => v.vin.toUpperCase() === vin.toUpperCase()) ?? null;
}

export async function getBodyTypes(): Promise<string[]> {
  const res = await fetch(`${API_URL}/vehicles/availableBodies`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];
  return res.json();
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  vehicleId?: number;
}) {
  const res = await fetch(`${API_URL}/websiteMessages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to submit form");
  return res.json();
}

export async function submitFinanceApplication(
  data: Record<string, unknown>
) {
  const res = await fetch(`${API_URL}/websiteMessages/financeApplication`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to submit application");
  return res.json();
}
