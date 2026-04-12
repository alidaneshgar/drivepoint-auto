import type { Metadata } from "next";
import { pageMetadata, mission, whyChooseUs } from "@/lib/data/dealership";
import { WhyChooseUs } from "@/components/why-choose-us";

export const metadata: Metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="pt-28">
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Us</h1>
          <p className="mt-2 text-lg opacity-80">
            Your trusted pre-owned car dealer in Coquitlam, BC
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="mb-6 text-2xl font-bold">Our Mission</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">{mission}</p>
        </div>
      </section>

      <WhyChooseUs />
    </div>
  );
}
