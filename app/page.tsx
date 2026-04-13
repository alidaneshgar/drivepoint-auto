import { Hero } from "@/components/hero";
import { InventorySearch } from "@/components/stats-counter";
import { RecentVehicles } from "@/components/recent-vehicles";
import { GoogleReviews } from "@/components/google-reviews";
import { CtaBanner } from "@/components/cta-banner";
import { ContactForm } from "@/components/contact-form";
import { dealership } from "@/lib/data/dealership";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="pt-[calc(2.25rem+73px)]">
      <Hero />
      <InventorySearch />
      <RecentVehicles />
      <CtaBanner />
      <GoogleReviews />

      {/* Contact section */}
      <section className="bg-muted/30 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-2">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
                Get In Touch
              </p>
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
                Ready to Find Your Next Car?
              </h2>
              <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                Visit us, call us, or send a message.
              </p>

              <div className="space-y-4">
                <a
                  href={`tel:${dealership.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Call us</p>
                    <p className="text-sm font-semibold">{dealership.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${dealership.email}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email us</p>
                    <p className="text-sm font-semibold">{dealership.email}</p>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Visit us</p>
                    <p className="text-sm font-semibold">
                      {dealership.address}, {dealership.city}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button asChild variant="outline" size="sm" className="rounded-xl">
                  <Link href="/contact">
                    View Full Contact Page
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm lg:col-span-3">
              <h3 className="mb-4 text-lg font-bold">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="h-[280px] w-full sm:h-[350px]">
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
