"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Shield,
  DollarSign,
  Star,
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
      {/*
        Mobile: taller so text fits over the image (aspect 16:9).
        Desktop: natural image ratio (4:1).
      */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[3/1] lg:aspect-[4/1]">
        {/* Slides */}
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
              className="object-cover sm:object-contain"
              priority={current < 3}
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20 sm:from-black/60 sm:via-black/30 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Hero text */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
            <div className="max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/80 backdrop-blur-sm sm:text-xs sm:px-4 sm:py-1.5 sm:mb-3"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                Coquitlam, BC
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-2 text-xl font-extrabold leading-[1.15] text-white drop-shadow-lg sm:text-3xl sm:mb-3 md:text-4xl lg:text-5xl"
              >
                Find Your{" "}
                <span className="bg-gradient-to-r from-white via-blue-200 to-blue-300 bg-clip-text text-transparent">
                  Perfect Ride
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-3 text-xs leading-relaxed text-white/70 sm:text-sm sm:mb-5 lg:text-lg"
              >
                Quality pre-owned vehicles, hand-picked and fully inspected.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-2 sm:gap-3"
              >
                <Button
                  asChild
                  className="h-8 rounded-lg bg-accent px-4 text-xs font-semibold shadow-lg shadow-accent/30 hover:bg-accent/90 sm:h-11 sm:rounded-xl sm:px-7 sm:text-sm"
                >
                  <Link href="/inventory">
                    Browse Inventory
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-8 rounded-lg border-white/25 bg-white/5 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/15 sm:h-11 sm:rounded-xl sm:px-7 sm:text-sm"
                >
                  <Link href="/contact">Test Drive</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Nav arrows — hidden on very small screens */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-1.5 text-white/50 backdrop-blur-sm transition-all hover:bg-black/40 hover:text-white sm:left-4 sm:p-2.5"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-1.5 text-white/50 backdrop-blur-sm transition-all hover:bg-black/40 hover:text-white sm:right-4 sm:p-2.5"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Bottom: counter only on mobile, dots on desktop */}
        <div className="absolute bottom-2 left-0 right-0 z-10 sm:bottom-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
            {/* Dots — hidden on mobile, shown on sm+ */}
            <div className="hidden items-center gap-1 sm:flex">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-accent lg:w-8"
                      : "w-1 bg-white/30 hover:bg-white/50 lg:w-1.5"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            {/* Counter — always visible */}
            <div className="ml-auto text-[10px] tabular-nums text-white/40 sm:text-xs">
              <span className="font-medium text-white/80">
                {String(current + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(SLIDE_COUNT).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] bg-black/10 sm:h-[3px]">
        <div
          className="h-full bg-accent transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Trust badges — stacked on mobile */}
      <div className="bg-primary">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 py-3 sm:gap-8 sm:py-4 md:px-6">
          {[
            { icon: Shield, text: "Fully Inspected" },
            { icon: DollarSign, text: "Fair Pricing" },
            { icon: Star, text: "Trusted Dealer" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-1.5 text-xs text-white/80 sm:text-sm"
            >
              <Icon className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
