import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { StructuredData } from "@/components/structured-data";
import { dealership, siteMetadata } from "@/lib/data/dealership";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(dealership.url),
  title: {
    default: siteMetadata.title,
    template: "%s | Drive Point Auto",
  },
  description: siteMetadata.description,
  authors: [{ name: "Drive Point Auto" }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: dealership.url,
    siteName: dealership.name,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: dealership.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            name: dealership.name,
            url: dealership.url,
            telephone: dealership.phone,
            email: dealership.email,
            image: `${dealership.url}/images/logo.png`,
            logo: `${dealership.url}/images/logo.png`,
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: dealership.address,
              addressLocality: dealership.city,
              addressRegion: dealership.province,
              postalCode: dealership.postalCode,
              addressCountry: dealership.country,
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: dealership.latitude,
              longitude: dealership.longitude,
            },
            openingHoursSpecification: [
              { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "18:00" },
              { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "17:00" },
              { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "11:00", closes: "16:00" },
            ],
          }}
        />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="bottom-right" />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
