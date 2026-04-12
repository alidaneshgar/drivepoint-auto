"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent via-[oklch(0.50_0.24_265)] to-primary p-10 sm:p-14"
        >
          {/* Decorative circles */}
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/5" />

          <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
                Need Financing?
              </h2>
              <p className="max-w-xl text-lg text-white/70">
                Get pre-approved in minutes. We work with multiple lenders to
                find you the best rate, regardless of your credit situation.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="h-12 shrink-0 rounded-xl bg-white px-8 text-base font-semibold text-primary shadow-xl hover:bg-white/90 transition-all"
            >
              <Link href="/financing">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
