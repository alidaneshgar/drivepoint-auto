"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Car, Handshake, MapPin, Wrench } from "lucide-react";

const highlights = [
  { icon: Car, label: "Buy, Sell, Trade & Finance" },
  { icon: Wrench, label: "Every Vehicle Inspected" },
  { icon: Handshake, label: "No-Pressure Experience" },
  { icon: MapPin, label: "Locally Owned in Coquitlam" },
];

export function StatsCounter() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-primary py-4 sm:py-14">
      <div className="absolute inset-0 opacity-[0.03] hidden sm:block" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Mobile: compact horizontal strip */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto sm:hidden" style={{ scrollbarWidth: "none" }}>
          {highlights.map(({ icon: Icon, label }) => (
            <div key={label} className="flex shrink-0 items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 text-accent" />
              <span className="whitespace-nowrap text-xs text-white/70">{label}</span>
            </div>
          ))}
        </div>

        {/* Desktop: full grid with icons */}
        <div className="hidden sm:grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <Icon className="mx-auto mb-3 h-7 w-7 text-accent" />
              <div className="text-base font-medium text-white/80">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
