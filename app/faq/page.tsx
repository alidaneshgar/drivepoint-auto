import type { Metadata } from "next";
import { pageMetadata } from "@/lib/data/dealership";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: pageMetadata.faq.title,
  description: pageMetadata.faq.description,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="pt-28">
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-lg opacity-80">
            Find answers to common questions about buying a car at Drive Point Auto
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <FaqSection />
        </div>
      </section>
    </div>
  );
}
