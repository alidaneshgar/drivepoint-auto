"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Star,
  DollarSign,
  Search,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-primary"
    >
      {/* Animated gradient background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[oklch(0.22_0.04_255)] to-[oklch(0.18_0.06_270)]" />
        {/* Radial glow */}
        <div className="absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </motion.div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-32 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/80 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Now Open &middot; Coquitlam, BC
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Find Your
              <br />
              <span className="bg-gradient-to-r from-white via-blue-200 to-accent-foreground bg-clip-text text-transparent">
                Perfect Ride
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8 max-w-lg text-lg leading-relaxed text-white/70 sm:text-xl"
            >
              Quality pre-owned vehicles, hand-picked and fully inspected.
              Fair pricing, honest service, zero pressure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-accent px-7 text-base font-semibold shadow-lg shadow-accent/30 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300"
              >
                <Link href="/inventory">
                  Browse Inventory
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-white/20 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <Link href="/contact">Schedule Test Drive</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right — search card + stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="hidden lg:block"
          >
            {/* Quick search card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <h2 className="mb-5 text-lg font-semibold text-white">
                <Search className="mr-2 inline h-5 w-5 text-accent" />
                Quick Search
              </h2>
              <div className="space-y-3">
                <Link
                  href="/inventory"
                  className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3.5 text-sm text-white/80 transition-all hover:bg-white/15 hover:text-white"
                >
                  <span>View All Vehicles</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/financing"
                  className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3.5 text-sm text-white/80 transition-all hover:bg-white/15 hover:text-white"
                >
                  <span>Get Pre-Approved</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3.5 text-sm text-white/80 transition-all hover:bg-white/15 hover:text-white"
                >
                  <span>Book a Test Drive</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "Fully Inspected", value: "100%" },
                { icon: DollarSign, label: "Fair Pricing", value: "Best Value" },
                { icon: Star, label: "Customer Rating", value: "5.0" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
                >
                  <Icon className="mx-auto mb-2 h-5 w-5 text-accent" />
                  <div className="text-lg font-bold text-white">{value}</div>
                  <div className="text-[11px] text-white/50">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-wrap justify-center gap-6 lg:hidden"
        >
          {[
            { icon: Shield, text: "Fully Inspected" },
            { icon: DollarSign, text: "Fair Pricing" },
            { icon: Star, text: "5-Star Reviews" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 text-sm text-white/60"
            >
              <Icon className="h-4 w-4 text-accent/80" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-white/30"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
