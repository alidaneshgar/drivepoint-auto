import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { pageMetadata, dealership, workingHours } from "@/lib/data/dealership";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-[calc(2.25rem+73px)]">
      <section className="bg-gradient-to-br from-primary to-[oklch(0.40_0.14_240)] py-10 text-primary-foreground sm:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/70">
            Reach Out
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Contact Us
          </h1>
          <p className="mt-2 text-base text-white/70 sm:text-lg">
            We&apos;d love to hear from you
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Contact info */}
            <div>
              <h2 className="mb-5 text-xl font-bold sm:mb-6 sm:text-2xl">Get In Touch</h2>
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground sm:text-base">
                      {dealership.address}, {dealership.city}, {dealership.province} {dealership.postalCode}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href={`tel:${dealership.phone.replace(/[^+\d]/g, "")}`} className="text-sm text-muted-foreground hover:text-accent transition-colors sm:text-base">
                      {dealership.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href={`mailto:${dealership.email}`} className="text-sm text-muted-foreground hover:text-accent transition-colors sm:text-base">
                      {dealership.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="mb-2 font-medium">Business Hours</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {workingHours.map((wh) => (
                        <li key={wh.day} className="flex justify-between gap-8">
                          <span>{wh.day}</span>
                          <span>{wh.hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="mb-5 text-xl font-bold sm:mb-6 sm:text-2xl">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="h-[280px] w-full sm:h-[350px] lg:h-[400px]">
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
