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
    <div className="pt-28">
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
          <p className="mt-2 text-lg opacity-80">We&apos;d love to hear from you</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact info */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      {dealership.address}, {dealership.city}, {dealership.province} {dealership.postalCode}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href={`tel:${dealership.phone.replace(/[^+\d]/g, "")}`} className="text-muted-foreground hover:text-accent transition-colors">
                      {dealership.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href={`mailto:${dealership.email}`} className="text-muted-foreground hover:text-accent transition-colors">
                      {dealership.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-accent" />
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
              <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
