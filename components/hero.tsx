"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Star,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SLIDE_COUNT = 23;
const SLIDE_INTERVAL = 5000;

const slides = Array.from({ length: SLIDE_COUNT }, (_, i) => ({
  src: `/images/slides/slide-${i + 1}.jpg`,
  alt: `Quality vehicle ${i + 1}`,
}));

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDE_COUNT);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDE_COUNT) % SLIDE_COUNT);
    setProgress(0);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, next]);

  // Progress bar animation
  useEffect(() => {
    if (isPaused) return;
    setProgress(0);
    const step = 100 / (SLIDE_INTERVAL / 30);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 30);
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current, isPaused]);

  return (
    <section
      className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].src}
            alt={slides[current].alt}
            fill
            className="object-cover"
            priority={current < 3}
            sizes="100vw"
            quality={85}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/80 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Now Open &middot; Coquitlam, BC
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mb-6 text-4xl font-extrabold leading-[1.08] text-white drop-shadow-lg sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Find Your
              <br />
              <span className="bg-gradient-to-r from-white via-blue-200 to-blue-300 bg-clip-text text-transparent">
                Perfect Ride
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mb-8 max-w-lg text-lg leading-relaxed text-white/75 sm:text-xl"
            >
              Quality pre-owned vehicles, hand-picked and fully inspected.
              Fair pricing, honest service, zero pressure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="h-13 rounded-xl bg-accent px-8 text-base font-semibold shadow-lg shadow-accent/30 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300"
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
                className="h-13 rounded-xl border-white/25 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/15 hover:border-white/40 transition-all duration-300"
              >
                <Link href="/contact">Schedule Test Drive</Link>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex flex-wrap gap-6"
            >
              {[
                { icon: Shield, text: "Fully Inspected" },
                { icon: DollarSign, text: "Fair Pricing" },
                { icon: Star, text: "5-Star Reviews" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-sm text-white/55"
                >
                  <Icon className="h-4 w-4 text-accent/80" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-3 text-white/60 backdrop-blur-sm transition-all hover:bg-black/40 hover:text-white md:left-6"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-3 text-white/60 backdrop-blur-sm transition-all hover:bg-black/40 hover:text-white md:right-6"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Bottom bar: dots + progress */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {/* Slide indicators */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pb-8 md:px-6">
          {/* Dot indicators - show groups on mobile */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-accent"
                    : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="text-xs tabular-nums text-white/40">
            <span className="text-white/80 font-medium">{String(current + 1).padStart(2, "0")}</span>
            {" / "}
            {String(SLIDE_COUNT).padStart(2, "0")}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] bg-white/10">
          <div
            className="h-full bg-accent transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-white/25"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
