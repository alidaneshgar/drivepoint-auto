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
    <div className="pt-[calc(2.25rem+73px)]">
      <section className="bg-gradient-to-br from-primary to-[oklch(0.40_0.14_240)] py-10 text-primary-foreground sm:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/70">
            Auto Financing
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Financing Options
          </h1>
          <p className="mt-2 text-base text-white/70 sm:text-lg">
            Flexible options to fit your budget
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Info */}
            <div>
              <h2 className="mb-5 text-xl font-bold sm:mb-6 sm:text-2xl">
                Flexible Auto Financing
              </h2>
              <p className="mb-6 text-base leading-relaxed text-muted-foreground sm:mb-8 sm:text-lg">
                We work with multiple lenders to find you the best rate possible.
                Whether you have excellent credit or are rebuilding, we have
                financing options for you.
              </p>

              <div className="space-y-5 sm:space-y-6">
                {[
                  {
                    icon: CheckCircle,
                    title: "Simple Process",
                    desc: "We help guide you through every step of the financing process.",
                  },
                  {
                    icon: CreditCard,
                    title: "Various Credit Situations",
                    desc: "We work with multiple lenders to explore options for different credit profiles.",
                  },
                  {
                    icon: Calculator,
                    title: "Multiple Lenders",
                    desc: "We shop different lenders to help find a rate that works for you.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent sm:h-10 sm:w-10">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8">
                <Button asChild size="lg" className="rounded-xl bg-accent hover:bg-accent/90">
                  <Link href="/credit-application">Apply Now</Link>
                </Button>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="mb-5 text-xl font-bold sm:mb-6 sm:text-2xl">Get Started</h2>
              <p className="mb-4 text-sm text-muted-foreground sm:mb-6 sm:text-base">
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
