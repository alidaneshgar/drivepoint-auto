"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent"
        >
          Our Reputation
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mb-4 text-3xl font-bold sm:text-4xl"
        >
          See What Our Customers Think
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-8 text-lg text-muted-foreground"
        >
          We let our customers speak for us. Check out our reviews on Google
          to see what real buyers have to say about their experience at Drive
          Point Auto.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="inline-flex flex-col items-center gap-4 sm:flex-row"
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <Button asChild variant="outline" className="rounded-xl">
            <a
              href="https://www.google.com/maps/place/Drive+Point+Auto/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Our Google Reviews
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
