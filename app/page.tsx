import { Hero } from "@/components/hero";
import { FeaturedVehicles } from "@/components/featured-vehicles";
import { WhyChooseUs } from "@/components/why-choose-us";
import { ContactForm } from "@/components/contact-form";
import { welcomeMessage } from "@/lib/data/dealership";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Welcome */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome to Drive Point Auto
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            {welcomeMessage.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <FeaturedVehicles />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Contact CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4 md:px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Have a question about a vehicle? Want to schedule a test drive?
              We&apos;d love to hear from you.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
