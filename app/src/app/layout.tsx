import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { contact, siteName, tagline } from "@/content/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  themeColor: "#0b0e14",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full dark`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd} />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <Toaster richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
