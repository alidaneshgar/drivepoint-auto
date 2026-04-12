import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { dealership, workingHours } from "@/lib/data/dealership";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Decorative gradient */}
      <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-8">
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt="Drive Point Auto"
                width={160}
                height={44}
                className="h-11 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Your trusted destination for quality pre-owned vehicles in Metro
              Vancouver. Honest pricing, reliable cars, exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/40">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/inventory", label: "Inventory" },
                { href: "/about", label: "About Us" },
                { href: "/financing", label: "Financing" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/40">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-white/60">
                  {dealership.address}
                  <br />
                  {dealership.city}, {dealership.province} {dealership.postalCode}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${dealership.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  {dealership.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${dealership.email}`}
                  className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  {dealership.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/40">
              Business Hours
            </h3>
            <ul className="space-y-2 text-sm">
              {workingHours.map((wh) => (
                <li key={wh.day} className="flex justify-between text-white/60">
                  <span>{wh.day}</span>
                  <span className="font-medium text-white/80">{wh.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {dealership.name}. All rights
            reserved.
          </p>
          <p className="text-xs text-white/30">
            {dealership.address}, {dealership.city}, {dealership.province}
          </p>
        </div>
      </div>
    </footer>
  );
}
