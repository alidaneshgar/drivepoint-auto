"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Car, Users, Calendar, ThumbsUp } from "lucide-react";

const stats = [
  { icon: Car, value: 200, suffix: "+", label: "Vehicles Sold" },
  { icon: Users, value: 500, suffix: "+", label: "Happy Customers" },
  { icon: Calendar, value: 5, suffix: "+", label: "Years in Business" },
  { icon: ThumbsUp, value: 100, suffix: "%", label: "Satisfaction Rate" },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function StatsCounter() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-primary py-16 sm:py-20">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <Icon className="mx-auto mb-3 h-7 w-7 text-accent" />
              <div className="text-3xl font-extrabold text-white sm:text-4xl">
                <AnimatedNumber value={value} suffix={suffix} inView={inView} />
              </div>
              <div className="mt-1 text-sm text-white/50">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
