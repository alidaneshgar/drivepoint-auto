import type { Metadata } from "next";
import { CreditApplicationForm } from "@/components/credit-application-form";

export const metadata: Metadata = {
  title: "Apply for Auto Financing | Drive Point Auto",
  description:
    "Apply for car financing online at Drive Point Auto. Quick approval, competitive rates, and flexible terms in Coquitlam, BC.",
  alternates: { canonical: "/credit-application" },
};

export default function CreditApplicationPage() {
  return (
    <div className="pt-[calc(2.25rem+73px)]">
      <section className="bg-gradient-to-br from-primary to-[oklch(0.40_0.14_240)] py-14 text-primary-foreground sm:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/70">
            Financing
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Credit Application
          </h1>
          <p className="mt-3 max-w-xl text-lg text-white/70">
            Get pre-approved in minutes
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <CreditApplicationForm />
        </div>
      </section>
    </div>
  );
}
