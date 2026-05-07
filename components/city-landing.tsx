import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/vehicle-card";
import { StructuredData } from "@/components/structured-data";
import { dealership } from "@/lib/data/dealership";
import type { CityInfo } from "@/lib/data/cities";
import type { Vehicle } from "@/lib/types/vehicle";

export function CityLanding({
  city,
  vehicles,
}: {
  city: CityInfo;
  vehicles: Vehicle[];
}) {
  const featured = vehicles.filter((v) => v.floor && !v.sold).slice(0, 8);
  const canonical = `${dealership.url}/used-cars-${city.slug}`;

  return (
    <div className="pt-[calc(2.25rem+73px)]">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: dealership.url },
            { "@type": "ListItem", position: 2, name: `Used Cars ${city.name}`, item: canonical },
          ],
        }}
      />

      <section className="bg-gradient-to-br from-primary to-[oklch(0.40_0.14_240)] py-6 text-primary-foreground sm:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <nav className="mb-2 text-xs text-white/60 sm:text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white/80">Used Cars in {city.name}</span>
          </nav>
          <h1 className="text-xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Used Cars for Sale Near {city.name}, BC
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80 sm:mt-3 sm:text-base">
            {city.intro}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {city.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <h2 className="pt-4 text-lg font-bold text-foreground sm:text-xl">
              Driving Directions from {city.name}
            </h2>
            <p>{city.drivingDirections}</p>
          </div>

          <aside className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
            <h2 className="text-base font-bold sm:text-lg">Visit Us</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold">{dealership.name}</p>
                  <p className="text-muted-foreground">
                    {dealership.address}
                    <br />
                    {dealership.city}, {dealership.province} {dealership.postalCode}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="text-muted-foreground">
                  <p>About {city.distanceFromCoquitlam} from {city.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a
                  href={`tel:${dealership.phone.replace(/[^+\d]/g, "")}`}
                  className="font-semibold text-foreground hover:text-accent"
                >
                  {dealership.phone}
                </a>
              </div>
            </div>
            <div className="grid gap-2">
              <Button asChild className="w-full rounded-xl bg-accent hover:bg-accent/90">
                <Link href="/inventory">Browse All Inventory</Link>
              </Button>
              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link href="/financing">Apply for Financing</Link>
              </Button>
            </div>
          </aside>
        </div>

        {featured.length > 0 && (
          <div className="mt-12">
            <div className="mb-5 flex items-end justify-between">
              <h2 className="text-xl font-bold sm:text-2xl">
                Featured Used Cars Near {city.name}
              </h2>
              <Link
                href="/inventory"
                className="text-sm font-medium text-accent hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="grid gap-4 grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {featured.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
