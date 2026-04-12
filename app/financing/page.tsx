import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/data/dealership";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: pageMetadata.financing.title,
  description: pageMetadata.financing.description,
  alternates: { canonical: "/financing" },
};

export default function FinancingPage() {
  return (
    <div className="pt-28">
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Financing
          </h1>
          <p className="mt-2 text-lg opacity-80">
            Get pre-approved in minutes
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">
                Flexible Auto Financing
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                We work with multiple lenders to find you the best rate possible.
                Whether you have excellent credit or are rebuilding, we have
                financing options for you.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: CheckCircle,
                    title: "Quick Approval",
                    desc: "Get a decision in minutes, not days.",
                  },
                  {
                    icon: CreditCard,
                    title: "All Credit Levels",
                    desc: "Good credit, bad credit, no credit — we work with everyone.",
                  },
                  {
                    icon: Calculator,
                    title: "Competitive Rates",
                    desc: "We shop multiple lenders to get you the best rate.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/contact">Apply Now</Link>
                </Button>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Get Started</h2>
              <p className="mb-6 text-muted-foreground">
                Send us your information and we&apos;ll get back to you with
                financing options tailored to your situation.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
