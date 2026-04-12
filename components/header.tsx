"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dealership } from "@/lib/data/dealership";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/about", label: "About" },
  { href: "/financing", label: "Financing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top contact bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-9 bg-primary text-primary-foreground">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 text-xs md:px-6">
          <a
            href={`tel:${dealership.phone.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
          >
            <Phone className="h-3 w-3" />
            {dealership.phone}
          </a>
          <span className="hidden opacity-70 sm:block">
            Mon-Fri 10-18 &middot; Sat 10-17 &middot; Sun 11-16
          </span>
          <Link
            href="/inventory"
            className="flex items-center gap-1 font-medium transition-opacity hover:opacity-80"
          >
            View Inventory
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`fixed left-0 right-0 top-9 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/97 backdrop-blur-xl shadow-sm border-b border-border/50"
            : "bg-white border-b border-border/30"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 md:px-6">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Drive Point Auto"
              width={180}
              height={50}
              className="h-11 w-auto sm:h-12"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full bg-accent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </Link>
            ))}
            <Button asChild size="sm" className="ml-3 rounded-lg bg-accent hover:bg-accent/90 shadow-md shadow-accent/20">
              <Link href="/inventory">Browse Inventory</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2.5 text-foreground transition-colors hover:bg-muted lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t bg-white lg:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Button asChild className="bg-accent hover:bg-accent/90">
                    <Link href="/inventory">Browse Inventory</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={`tel:${dealership.phone.replace(/[^+\d]/g, "")}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call Us
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
