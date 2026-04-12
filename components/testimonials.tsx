"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    text: "Best car buying experience I've ever had. The team was honest, transparent, and really cared about finding the right car for me. No pressure at all!",
    rating: 5,
  },
  {
    name: "James K.",
    text: "Bought a 2021 Civic from Drive Point Auto and couldn't be happier. Fair price, great condition, and they even helped me set up financing. Highly recommend!",
    rating: 5,
  },
  {
    name: "Priya D.",
    text: "I was nervous about buying a used car but Drive Point Auto made it so easy. They showed me the inspection report, explained everything, and gave me a fair trade-in value.",
    rating: 5,
  },
];

export function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold sm:text-4xl"
          >
            What Our Customers Say
          </motion.h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
            >
              <Quote className="mb-4 h-8 w-8 text-accent/20" />
              <p className="mb-5 leading-relaxed text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">Verified Customer</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
