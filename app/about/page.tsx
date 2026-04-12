import type { Metadata } from "next";
import { pageMetadata, mission, dealership } from "@/lib/data/dealership";
import { WhyChooseUs } from "@/components/why-choose-us";
import { GoogleReviews } from "@/components/google-reviews";

export const metadata: Metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="pt-[calc(2.25rem+73px)]">
      <section className="bg-gradient-to-br from-primary to-[oklch(0.40_0.14_240)] py-14 text-primary-foreground sm:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/70">
            About Us
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            About Drive Point Auto
          </h1>
          <p className="mt-3 max-w-xl text-lg text-white/70">
            Your trusted pre-owned car dealer in Coquitlam, BC
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="mb-6 text-2xl font-bold">Our Mission</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {mission}
          </p>
        </div>
      </section>

      <WhyChooseUs />
      <GoogleReviews />

      {/* Google Map */}
      <section className="h-[350px] w-full sm:h-[400px]">
        <iframe
          title="Drive Point Auto Location"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(`${dealership.name}, ${dealership.address}, ${dealership.city}, ${dealership.province} ${dealership.postalCode}`)}`}
          className="h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
}
