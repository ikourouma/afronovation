import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Urbanist } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteTopBars } from "@/components/layout/site-top-bars";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { contact, siteName, tagline } from "@/content/site";

import "./globals.css";

// Urbanist stands in for the portfolio's Century Gothic (headings, UI);
// Source Serif 4 for its Cambria body copy.
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://afronovation.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | afronovation, Inc.",
    default: "afronovation, Inc.",
  },
  description: tagline,
  openGraph: {
    type: "website",
    siteName: "afronovation, Inc.",
    title: "afronovation, Inc.",
    description: tagline,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "afronovation, Inc.",
    description: tagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#02132c",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteName,
  description: tagline,
  url: siteUrl,
  email: contact.email,
  telephone: contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${sourceSerif.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd} />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <SiteTopBars />
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <MobileCtaBar />
          <Toaster richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
