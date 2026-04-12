import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { dealership, workingHours } from "@/lib/data/dealership";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="mb-4 text-lg font-bold">{dealership.name}</h3>
            <p className="text-sm leading-relaxed opacity-80">
              Your trusted destination for quality pre-owned vehicles in Metro
              Vancouver. Honest pricing, reliable cars, and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
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
                    className="opacity-80 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 opacity-80" />
                <span className="opacity-80">
                  {dealership.address}, {dealership.city}, {dealership.province}{" "}
                  {dealership.postalCode}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${dealership.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {dealership.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${dealership.email}`}
                  className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {dealership.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Business Hours</h3>
            <ul className="space-y-1.5 text-sm">
              {workingHours.map((wh) => (
                <li
                  key={wh.day}
                  className="flex justify-between opacity-80"
                >
                  <span>{wh.day}</span>
                  <span>{wh.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs opacity-60 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {dealership.name}. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{dealership.address}, {dealership.city}, {dealership.province}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
