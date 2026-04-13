import type { Metadata } from "next";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Meet the Drive Point Auto Team | Coquitlam Car Dealership",
  description:
    "Meet the dedicated team at Drive Point Auto in Coquitlam, BC. Our knowledgeable staff is here to help you find your perfect vehicle.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <div className="pt-[calc(2.25rem+73px)]">
      <section className="bg-gradient-to-br from-primary to-[oklch(0.40_0.14_240)] py-14 text-primary-foreground sm:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/70">
            Our People
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Meet Our Team
          </h1>
          <p className="mt-3 max-w-xl text-lg text-white/70">
            The people behind Drive Point Auto
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Users className="h-8 w-8" />
          </div>
          <h2 className="mb-4 text-2xl font-bold">
            A Team You Can Trust
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            At Drive Point Auto, our friendly and knowledgeable team is
            committed to providing an honest, transparent, and pressure-free
            car buying experience. Whether you need help choosing a vehicle,
            exploring financing options, or scheduling a test drive, we are
            here for you.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Visit us at 819 Brunette Ave, Coquitlam, or give us a call at
            (604) 213-2322. We look forward to helping you find your next car.
          </p>
        </div>
      </section>
    </div>
  );
}
