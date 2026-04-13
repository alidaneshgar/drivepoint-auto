import type { Metadata } from "next";
import { pageMetadata } from "@/lib/data/dealership";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "FAQ About Buying Used Cars in Coquitlam | Drive Point Auto",
  description: pageMetadata.faq.description,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="pt-[calc(2.25rem+73px)]">
      <section className="bg-gradient-to-br from-primary to-[oklch(0.40_0.14_240)] py-10 text-primary-foreground sm:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/70">
            Help Center
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-base text-white/70 sm:text-lg">
            Find answers to common questions about buying a car at Drive Point Auto
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <FaqSection />
        </div>
      </section>
    </div>
  );
}
