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

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, SLIDE_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, next]);

  useEffect(() => {
    if (isPaused) return;
    setProgress(0);
    const step = 100 / (SLIDE_INTERVAL / 30);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 30);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [current, isPaused]);

  return (
    <section
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slideshow — natural aspect ratio (4:1) */}
      <div className="relative w-full" style={{ aspectRatio: "4 / 1" }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              className="object-contain"
              priority={current < 3}
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Hero text content — overlaid on the image */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white/80 backdrop-blur-sm sm:text-xs sm:px-4 sm:py-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                Now Open &middot; Coquitlam, BC
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-3 text-2xl font-extrabold leading-[1.1] text-white drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl"
              >
                Find Your{" "}
                <span className="bg-gradient-to-r from-white via-blue-200 to-blue-300 bg-clip-text text-transparent">
                  Perfect Ride
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-5 max-w-md text-sm leading-relaxed text-white/70 sm:text-base lg:text-lg"
              >
                Quality pre-owned vehicles, hand-picked and fully inspected.
                Fair pricing, honest service, zero pressure.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col gap-2 sm:flex-row sm:gap-3"
              >
                <Button
                  asChild
                  size="lg"
                  className="h-10 rounded-xl bg-accent px-6 text-sm font-semibold shadow-lg shadow-accent/30 hover:bg-accent/90 transition-all sm:h-12 sm:px-8 sm:text-base"
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
                  className="h-10 rounded-xl border-white/25 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15 transition-all sm:h-12 sm:px-8 sm:text-base"
                >
                  <Link href="/contact">Schedule Test Drive</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white/60 backdrop-blur-sm transition-all hover:bg-black/40 hover:text-white sm:left-5 sm:p-3"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white/60 backdrop-blur-sm transition-all hover:bg-black/40 hover:text-white sm:right-5 sm:p-3"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Bottom: dots + counter */}
        <div className="absolute bottom-3 left-0 right-0 z-10 sm:bottom-5">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-accent sm:w-8"
                      : "w-1 bg-white/30 hover:bg-white/50 sm:w-1.5"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="text-[10px] tabular-nums text-white/40 sm:text-xs">
              <span className="font-medium text-white/80">
                {String(current + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(SLIDE_COUNT).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar — flush at bottom */}
      <div className="h-[3px] bg-black/10">
        <div
          className="h-full bg-accent transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Trust badges bar below the image */}
      <div className="bg-primary">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 py-4 sm:gap-10 sm:py-5 md:px-6">
          {[
            { icon: Shield, text: "Fully Inspected" },
            { icon: DollarSign, text: "Fair Pricing" },
            { icon: Star, text: "5-Star Reviews" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 text-sm text-primary-foreground/70"
            >
              <Icon className="h-4 w-4 text-accent" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
