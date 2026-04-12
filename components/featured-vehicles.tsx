"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/vehicle-card";
import { useFloorVehicles } from "@/hooks/use-vehicles";

export function FeaturedVehicles() {
  const { vehicles, loading } = useFloorVehicles();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const featured = vehicles.filter((v) => !v.sold && v.floor).slice(0, 6);

  return (
    <section ref={ref} className="bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent"
          >
            Our Inventory
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="mb-4 text-3xl font-bold sm:text-4xl"
          >
            Featured Vehicles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
          >
            Hand-picked, fully inspected, and priced right. Browse our latest
            arrivals below.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <p className="text-sm text-muted-foreground">Loading vehicles...</p>
          </div>
        ) : featured.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              New inventory coming soon. Check back shortly!
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((vehicle, i) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                >
                  <VehicleCard vehicle={vehicle} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-12 text-center"
            >
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl px-8 text-base shadow-md shadow-accent/20"
              >
                <Link href="/inventory">
                  View All Inventory
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
